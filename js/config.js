/*
  MODIFIEZ CE FICHIER POUR PERSONNALISER L'ÉCRAN.
  Les photos et la musique se placent dans le dossier assets/.
*/
window.LOADING_CONFIG = {
  serverName: "SCP: SITE-19 RP",
  serverTagline: "FONDATION SCP — ACCÈS AU SITE 19",
  welcomeText: "Vos identifiants sont en cours de vérification. Préparez-vous à intégrer le Site-19.",
  playerName: "Personnel autorisé",
  playerAvatar: "", // Exemple : "assets/player.jpg" (facultatif)
  playerSteamId: "", // Laissez vide : GMod le reçoit automatiquement avec ?steamid=%s.
  steam: {
    enabled: true,
    queryParameter: "steamid",
    // Recommandé : l'adresse de VOTRE Cloudflare Worker inclus dans worker/.
    // Exemple : "https://scp-steam-avatar.votre-compte.workers.dev/avatar?steamid="
    // Sans Worker, le service public de secours sera utilisé.
    avatarProxyUrl: "https://steamapi.noeouvrard85.workers.dev/avatar?steamid=",
    fallbackAvatarService: "https://unavatar.io/steam/profile:"
  },
  accentColor: "#d33131",
  discordUrl: "https://discord.gg/votre-invitation",
  footerText: "Sécuriser · Contenir · Protéger",
  backgroundImage: "assets/background.svg", // Remplacez par "assets/background.jpg" pour votre photo.
  music: {
    enabled: true,
    source: "assets/music.mp3", // Ajoutez votre fichier MP3 à cet emplacement.
    volume: 0.22,
    autoplay: false // Les navigateurs bloquent souvent l'autoplay : le bouton musique reste disponible.
  },
  rules: [
    "Restez RP : chaque action doit être cohérente avec votre rôle et votre niveau d'autorisation.",
    "Respectez le personnel, les détenus et la chaîne de commandement de la Fondation.",
    "Ne communiquez aucune information hors personnage (metagaming) et n'exploitez aucun bug.",
    "Suivez les consignes du staff. En cas de problème, contactez-le calmement via un ticket."
  ],
  staff: [
    { name: "O5-01", grade: "Fondateur", steamId: "", image: "" },
    { name: "Dr. Shaw", grade: "Administrateur", steamId: "", image: "" },
    { name: "Agent Kappa", grade: "Modérateur", steamId: "", image: "" },
    { name: "Dr. Glass", grade: "Support", steamId: "", image: "" }
  ]
};
