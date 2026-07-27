# Loading screen SCP-RP Garry's Mod — GitHub Pages

Un écran de chargement SCP-RP, responsive et prêt à publier gratuitement avec GitHub Pages. Il comprend : pseudo en haut, progression réelle de connexion GMod, membres du staff avec grade et activité, grand panneau de règles, image de fond et musique.

## Personnalisation rapide

Ouvrez **`js/config.js`** : c'est le seul fichier à modifier pour changer le nom du serveur, le pseudo, les règles, le staff, les couleurs et les textes.

## Barre de chargement Garry's Mod

La page inclut les fonctions de chargement natives de Garry's Mod (`SetStatusChanged`, `SetFilesTotal`, `SetFilesNeeded` et `DownloadingFile`). Lorsque vous l'utilisez comme URL de loading screen dans GMod, la barre et le texte affichent exclusivement l'état réel de la connexion et des téléchargements. Il n'y a aucune animation ni étape prédéfinie : ouverte hors de GMod, la page attend simplement les données du jeu.

Dans la configuration de votre serveur GMod, définissez l'URL de chargement sur l'adresse GitHub Pages publiée, par exemple :

```cfg
sv_loadingurl "https://votre-compte.github.io/votre-depot/?steamid=%s"
```

Redémarrez ensuite le serveur. Pour que le serveur transmette correctement les fichiers à télécharger, conservez vos ressources Workshop / FastDL configurées comme d'habitude : la page affichera leur progression quand GMod la fournit.

## Photos Steam automatiques et fiables

Les photos de profil sont récupérées directement depuis les SteamID64, sans avoir à enregistrer les photos dans le projet.

- **Joueur qui se connecte** : l'URL GMod doit conserver `?steamid=%s` (comme dans l'exemple ci-dessus). GMod remplace automatiquement `%s` par son SteamID64.
- **Membres du staff** : renseignez le champ `steamId` de chaque membre dans `js/config.js`.

```js
{ name: "Dr. Shaw", grade: "Administrateur", activity: "En service", online: true, steamId: "7656119XXXXXXXXXX", image: "" }
```

Le dossier `worker/` contient une solution recommandée qui demande l'avatar à l'API officielle Steam sans exposer votre clé. Suivez son guide, puis renseignez son adresse dans `steam.avatarProxyUrl`. Le projet conserve un service public de secours tant que le Worker n'est pas configuré. Une image renseignée dans `image` est toujours prioritaire sur Steam.

Les SteamID64, `STEAM_0:X:YYYY` et `[U:1:YYYY]` sont acceptés pour le staff et convertis automatiquement.

### Ajouter une photo de fond

1. Déposez votre image dans `assets/`, par exemple `assets/background.jpg`.
2. Dans `js/config.js`, remplacez `backgroundImage: "assets/background.svg"` par `backgroundImage: "assets/background.jpg"`.

### Ajouter la musique

1. Ajoutez votre fichier sous le nom `assets/music.mp3`.
2. Laissez `enabled: true` et adaptez le volume avec `volume: 0.22` si nécessaire.

Le navigateur peut refuser de lancer automatiquement la musique ; le bouton « Musique désactivée » permet au visiteur de l'activer. C'est un comportement normal des navigateurs modernes.

### Ajouter les photos du staff

Ajoutez une photo dans `assets/`, puis indiquez son chemin dans le membre concerné :

```js
{ name: "Anna", grade: "Administratrice", activity: "En service", online: true, image: "assets/staff-anna.jpg" }
```

## Publication sur GitHub Pages

1. Créez un nouveau dépôt GitHub (public ou privé selon votre formule GitHub).
2. Envoyez **le contenu** de ce dossier dans le dépôt : `index.html` doit se trouver à la racine.
3. Dans GitHub : **Settings → Pages**.
4. Dans **Build and deployment**, choisissez **Deploy from a branch**, puis la branche `main` et le dossier `/(root)`.
5. Enregistrez. GitHub affichera votre adresse publique après quelques instants.

Le fichier `.nojekyll` évite que GitHub Pages ignore certains fichiers ou dossiers.

## Tester avant publication

Ouvrez simplement `index.html` dans votre navigateur. Pour voir un rendu fidèle, privilégiez Chrome, Edge, Firefox ou Safari récents.

## Structure

```text
index.html          structure de la page
css/style.css       apparence et responsive
js/config.js        toutes les données à personnaliser
js/app.js           affichage et progression
assets/             photos et musique à ajouter
```

> Conseil : n'utilisez que des médias que vous avez le droit de diffuser.
