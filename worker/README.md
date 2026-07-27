# Relais d'avatar Steam fiable

GitHub Pages est un hébergement statique : il ne peut pas garder une clé Steam secrète. Ce Worker Cloudflare interroge l'API officielle Steam, garde la clé hors de GitHub et met les images en cache 24 heures.

## Installation (une seule fois)

1. Créez un **Worker** gratuit dans le tableau de bord Cloudflare.
2. Remplacez le code du Worker par `steam-avatar-worker.js`.
3. Dans **Settings → Variables and Secrets**, créez un secret nommé `STEAM_WEB_API_KEY` avec votre clé Steam Web API.
4. Déployez le Worker et copiez son adresse, par exemple `https://scp-steam-avatar.votre-compte.workers.dev`.
5. Dans `js/config.js`, définissez :

```js
avatarProxyUrl: "https://scp-steam-avatar.votre-compte.workers.dev/avatar?steamid=",
```

Le loading screen acceptera un SteamID64 (`765…`), l'ancien format (`STEAM_0:1:...`) et Steam3 (`[U:1:...]`) pour le staff. Pour le joueur qui se connecte, utilisez bien `?steamid=%s` dans `sv_loadingurl` : GMod transmet un SteamID64.
