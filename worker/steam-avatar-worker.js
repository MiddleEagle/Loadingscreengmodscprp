/**
 * Cloudflare Worker — proxy d'avatar Steam pour le loading screen.
 * Créez le secret STEAM_WEB_API_KEY dans les réglages du Worker : il ne doit
 * jamais être copié dans js/config.js ou sur GitHub Pages.
 */
const STEAM_API = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/";

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.pathname !== "/avatar" && url.pathname !== "/profile") return new Response("Not found", { status: 404 });
    const steamId = url.searchParams.get("steamid") || "";
    if (!/^7656119\d{10}$/.test(steamId)) return new Response("SteamID64 invalide", { status: 400 });
    if (!env.STEAM_WEB_API_KEY) return new Response("Secret STEAM_WEB_API_KEY manquant", { status: 500 });

    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const steamUrl = new URL(STEAM_API);
    steamUrl.searchParams.set("key", env.STEAM_WEB_API_KEY);
    steamUrl.searchParams.set("steamids", steamId);
    const steamResponse = await fetch(steamUrl);
    if (!steamResponse.ok) return new Response("Steam indisponible", { status: 502 });
    const data = await steamResponse.json();
    const player = data?.response?.players?.[0];
    const avatarUrl = player?.avatarfull;
    if (!avatarUrl) return new Response("Avatar introuvable", { status: 404 });

    if (url.pathname === "/profile") {
      const response = new Response(JSON.stringify({ name: player.personaname || "Joueur", avatar: avatarUrl }), {
        status: 200,
        headers: { "Content-Type": "application/json; charset=UTF-8", "Cache-Control": "public, max-age=3600, s-maxage=3600", "Access-Control-Allow-Origin": "*" }
      });
      context.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }

    const imageResponse = await fetch(avatarUrl);
    if (!imageResponse.ok) return new Response("Image Steam indisponible", { status: 502 });
    const headers = new Headers(imageResponse.headers);
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");
    headers.set("Access-Control-Allow-Origin", "*");
    const response = new Response(imageResponse.body, { status: 200, headers });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  }
};
