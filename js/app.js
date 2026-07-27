(() => {
  const config = window.LOADING_CONFIG;
  const $ = (selector) => document.querySelector(selector);
  const initials = (value) => (value || "?").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  const hexToRgb = (hex) => {
    const cleaned = hex.replace("#", "");
    const full = cleaned.length === 3 ? cleaned.split("").map((x) => x + x).join("") : cleaned;
    const value = Number.parseInt(full, 16);
    return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
  };
  const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
  const normalizeSteamId = (steamId) => {
    const value = String(steamId || "").trim();
    if (/^7656119\d{10}$/.test(value)) return value; // SteamID64
    const classic = value.match(/^STEAM_[0-5]:([01]):(\d+)$/i);
    if (classic) return (76561197960265728n + (BigInt(classic[2]) * 2n) + BigInt(classic[1])).toString();
    const steam3 = value.match(/^\[U:1:(\d+)\]$/i);
    if (steam3) return (76561197960265728n + BigInt(steam3[1])).toString();
    return "";
  };
  const steamAvatarUrl = (steamId) => {
    if (!config.steam?.enabled) return "";
    const steamId64 = normalizeSteamId(steamId);
    if (!steamId64) return "";
    const service = config.steam.avatarProxyUrl || config.steam.fallbackAvatarService;
    return service ? `${service}${encodeURIComponent(steamId64)}` : "";
  };
  const steamProfileUrl = (steamId) => {
    const steamId64 = normalizeSteamId(steamId);
    if (!config.steam?.enabled || !steamId64) return "";
    const service = config.steam.profileProxyUrl || config.steam.avatarProxyUrl.replace("/avatar?", "/profile?");
    return service ? `${service}${encodeURIComponent(steamId64)}` : "";
  };
  const setAvatar = (node, name, image) => {
    node.textContent = initials(name);
    node.classList.remove("has-image");
    if (!image) return;
    const preloader = new Image();
    preloader.onload = () => { node.style.backgroundImage = `url("${image}")`; node.classList.add("has-image"); };
    preloader.src = image;
  };

  document.title = `${config.serverName} — Chargement`;
  document.documentElement.style.setProperty("--accent", config.accentColor);
  document.documentElement.style.setProperty("--accent-rgb", hexToRgb(config.accentColor));
  $(".background").style.backgroundImage = `url("${config.backgroundImage}")`;
  setText("#server-name", config.serverName);
  setText("#server-tagline", config.serverTagline);
  setText("#welcome-text", config.welcomeText);
  setText("#player-name", config.playerName);
  setText("#player-role", config.playerRole);
  setText("#footer-text", config.footerText);
  $("#discord-link").href = config.discordUrl;
  const parameters = new URLSearchParams(window.location.search);
  const playerSteamId = config.playerSteamId || parameters.get(config.steam?.queryParameter || "steamid");
  setAvatar($("#player-avatar"), config.playerName, config.playerAvatar || steamAvatarUrl(playerSteamId));
  const profileUrl = steamProfileUrl(playerSteamId);
  if (profileUrl) {
    fetch(profileUrl)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((profile) => {
        if (!profile?.name) return;
        setText("#player-name", profile.name);
        setAvatar($("#player-avatar"), profile.name, config.playerAvatar || profile.avatar || steamAvatarUrl(playerSteamId));
      })
      .catch(() => { /* Le nom de secours reste affiché si Steam est indisponible. */ });
  }

  const rules = $("#rules-list");
  config.rules.forEach((rule) => { const item = document.createElement("li"); item.textContent = rule; rules.append(item); });

  const staffList = $("#staff-list");
  config.staff.forEach((member) => {
    const item = document.createElement("article");
    item.className = "staff-member";
    const avatar = document.createElement("div");
    avatar.className = "staff-avatar";
    setAvatar(avatar, member.name, member.image || steamAvatarUrl(member.steamId));
    const text = document.createElement("div"); text.className = "staff-copy";
    text.innerHTML = `<span class="staff-name"></span><span class="staff-meta"></span>`;
    text.querySelector(".staff-name").textContent = member.name;
    text.querySelector(".staff-meta").textContent = member.grade;
    item.append(avatar, text); staffList.append(item);
  });

  const fill = $("#progress-fill"), percent = $("#loading-percent"), status = $("#loading-status"), detail = $("#loading-detail"), progressbar = $(".progress-track");
  let gmodFilesTotal = 0;
  const updateProgress = (amount, nextStatus, nextDetail) => {
    const safeAmount = Math.max(0, Math.min(100, Math.round(Number(amount) || 0)));
    if (nextStatus) status.textContent = nextStatus;
    if (nextDetail) detail.textContent = nextDetail;
    fill.style.width = `${safeAmount}%`; percent.textContent = `${safeAmount}%`; progressbar.setAttribute("aria-valuenow", safeAmount);
  };
  // Appelées automatiquement par Garry's Mod lorsqu'elles existent dans la page de chargement.
  // Aucun état n'est simulé : les informations ci-dessous proviennent exclusivement de GMod.
  window.SetStatusChanged = (newStatus) => {
    const message = String(newStatus || "Connexion au serveur…");
    updateProgress(Number(percent.textContent.replace("%", "")), message, "Statut transmis par Garry's Mod");
  };
  window.SetFilesTotal = (total) => {
    gmodFilesTotal = Math.max(0, Number(total) || 0);
    updateProgress(0, "Téléchargement des ressources…", `${gmodFilesTotal} fichier(s) à télécharger`);
  };
  window.SetFilesNeeded = (needed) => {
    const remaining = Math.max(0, Number(needed) || 0);
    const completed = Math.max(0, gmodFilesTotal - remaining);
    const value = gmodFilesTotal ? (completed / gmodFilesTotal) * 100 : 0;
    updateProgress(value, "Téléchargement des ressources…", `${remaining} fichier(s) restant(s)`);
  };
  window.DownloadingFile = (fileName) => {
    const value = Number(percent.textContent.replace("%", ""));
    updateProgress(value, "Téléchargement des ressources…", fileName ? `Téléchargement : ${fileName}` : "Téléchargement en cours…");
  };
  window.GameDetails = (serverName) => { if (serverName) setText("#server-name", serverName); };

  const music = $("#background-music"), control = $("#sound-control"), label = $("#sound-label");
  const setMusicLabel = (playing) => { label.textContent = playing ? "Musique activée" : "Musique désactivée"; control.setAttribute("aria-label", label.textContent); };
  if (config.music.enabled && config.music.source) {
    music.src = config.music.source; music.volume = Math.min(1, Math.max(0, config.music.volume));
    const toggleMusic = async () => {
      if (music.paused) { try { await music.play(); setMusicLabel(true); } catch (_) { setMusicLabel(false); } }
      else { music.pause(); setMusicLabel(false); }
    };
    control.addEventListener("click", toggleMusic);
    if (config.music.autoplay) music.play().then(() => setMusicLabel(true)).catch(() => setMusicLabel(false));
  } else { control.hidden = true; }
})();
