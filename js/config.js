/*
  MODIFIEZ CE FICHIER POUR PERSONNALISER L'ÉCRAN.
  Les photos et la musique se placent dans le dossier assets/.
*/
window.LOADING_CONFIG = {
  serverName: "SunLight",
  serverTagline: "FONDATION SCP — ACCÈS AU SITE 33",
  welcomeText: "La Connexion est en cours merci de patienter.",
  playerRole: "Personnel autorisé",
  playerName: "Joueur", // Nom de secours si l'API Steam n'est pas configurée.
  playerAvatar: "", // Exemple : "assets/player.jpg" (facultatif)
  playerSteamId: "", // Laissez vide : GMod le reçoit automatiquement avec ?steamid=%s.
  steam: {
    enabled: true,
    queryParameter: "steamid",
    // Recommandé : l'adresse de VOTRE Cloudflare Worker inclus dans worker/.
    // Exemple : "https://scp-steam-avatar.votre-compte.workers.dev/avatar?steamid="
    // Sans Worker, le service public de secours sera utilisé.
    avatarProxyUrl: "",
    // Facultatif : si vide, l'adresse /profile est déduite automatiquement de avatarProxyUrl.
    profileProxyUrl: "https://steamapi.noeouvrard85.workers.dev/profile?steamid=",
    fallbackAvatarService: "https://unavatar.io/steam/profile:"
  },
  accentColor: "#d33131",
  footerText: "Sécuriser · Contenir · Protéger",
  backgroundImage: "assets/background.svg", // Remplacez par "assets/background.jpg" pour votre photo.
  music: {
    enabled: true,
    source: "assets/music.mp3", // Ajoutez votre fichier MP3 à cet emplacement.
    volume: 0.22,
    autoplay: true // Lecture lancée automatiquement à l'ouverture du loading screen.
  },
  rules: [
    "Restez RP : chaque action doit être cohérente avec votre rôle et votre niveau d'autorisation.",
    "Respectez le personnel, les détenus et la chaîne de commandement de la Fondation.",
    "Ne communiquez aucune information hors personnage (metagaming) et n'exploitez aucun bug.",
    "Suivez les consignes du staff. En cas de problème, contactez-le calmement via un ticket."
  ],
  staff: [
    { name: "DemonTube", grade: "Fondateur", steamId: "76561199466721881", image: "" },
    { name: "Cacao", grade: "Co Fondateur", steamId: "76561199209366991", image: "" },
    { name: "Blue", grade: "Co Fondateur", steamId: "76561199245355095", image: "" },
    { name: "Christ Xiloss", grade: "Gérant Global", steamId: "76561198094185969", image: "" },
    { name: "MiddleEagle", grade: "Responsable", steamId: "76561199644813006", image: "" },
    { name: "Zenox", grade: "Administrateur", steamId: "76561199680615624", image: "" },
    { name: "Leo Epic", grade: "Moderateur Sénior", steamId: "76561199800509330", image: "" },
    { name: "Jonson", grade: "Moderateur", steamId: "76561199811076597", image: "" },
    { name: "Asashin", grade: "Moderateur", steamId: "76561199166630728", image: "" },
    { name: "Pizza", grade: "Modérateur test", steamId: "STEAM_0:1:366151153", image: "" },
    { name: "Zoulou", grade: "Modérateur test", steamId: "STEAM_0:1:598195100", image: "" },
    { name: "Olie", grade: "Modérateur test", steamId: "76561199304516443", image: "" },
  ]
};