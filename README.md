# LeekWars Builder #

Si vous développez une IA LeekWars en local, ce programme vous permet de fusionner tous les fichiers composants celle-ci et de mettre à jour le script sur votre compte LeekWars.

## Initialisation ##

1.  Installer les dépendances node

<code>npm install</code>

2. (facultatif) Entrer ses identifiants leekwars dans config/config.json

Si vous n'entrez pas vos identifiants dans le fichier config.json ou si vous n'entrez que votre login, le reste pour sera demander de façon interactive.

## Pré-requis ##

- Le fichier passé en paramètre doit être le seul qui contient des <code>include</code>
- Les chemins des <code>include</code> doivent être relatifs

## Exemple ##

<code bash>node build.js /home/user/main.ls</code>
