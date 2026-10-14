# QUEST — prototype de reconnaissance d’image

Page statique : MindAR 1.2.5 + A-Frame 1.6.0, bibliothèques incluses localement. Aucun compte participant, serveur applicatif, base de données, API payante ou envoi des images caméra. La permission caméra est demandée après le bouton Démarrer. HTTPS obligatoire hors localhost.

## Essai iPhone
1. Afficher reference.html sur un ordinateur ou imprimer l’image reference.png, sans étirement ni recadrage.
2. Ouvrir l’URL publiée dans Safari sur iPhone, toucher Démarrer l’expérience, autoriser la caméra.
3. Viser l’image entière. Le panneau « ÉMILIE EST PASSÉE ICI » est un objet enfant de la cible MindAR : sa pose et sa visibilité suivent la reconnaissance.
4. Quitter libère la caméra. Une erreur propose de recharger.

Le délai indiqué est mesuré depuis la disponibilité du moteur, pas depuis le moment exact où l’image entre dans le cadre. Les reprises sont mesurées depuis la perte précédente. Ce sont des indications de terrain, pas un benchmark scientifique.

## Remplacer par votre tableau
Envoyez une photographie nette, de face, du tableau complet, sans reflet. Je pourrai recadrer la cible, la compiler et republier.
Procédure technique : compiler l’image dans https://hiukim.github.io/mind-ar-js-doc/tools/compile/ ; remplacer targets.mind et reference.png (PNG sans orientation EXIF ambiguë) ; republier. Le message reste identique.
Pour plusieurs cibles : compiler les images ensemble, dans un ordre stable ; ajouter leurs indices 0, 1, 2… et leurs deux lignes de contenu dans config.js. Un seul suivi simultané est configuré. Dix cibles ne nécessitent aucune facturation MindAR, mais augmentent téléchargement, mémoire et temps potentiel de recherche. Si nécessaire, séparer les lieux en plusieurs ensembles de cibles.

## Publication GitHub Pages
Créer un dépôt public indépendant quest-ar-demo. Déposer le contenu de ce dossier à sa racine, y compris les bibliothèques et la cible. Settings → Pages → Deploy from a branch → main → / (root) → Save. Aucun build nécessaire. Attendre la publication puis vérifier l’URL HTTPS et les fichiers targets.mind, reference.png, aframe.min.js, mindar-image-aframe.prod.js.

## Tests physiques à réaliser (non réalisés par l’agent)
Faire 3 essais par condition, noter délai, tremblement et pertes :
- De face : image à environ un tiers, la moitié, puis trois quarts du cadre.
- Angles : environ 20° et 40°, horizontalement puis verticalement.
- Distances : 30, 60 et 100 cm pour une petite impression, à ajuster à la taille du support.
- Suivi : petit déplacement latéral, puis maintien pendant 10 secondes.
- Perte/reprise : sortir entièrement l’image du cadre 3 secondes puis revenir.
- Éclairage : lumière diffuse, pièce plus sombre, lumière latérale ; éviter d’abord les reflets puis les tester.
- Extérieur : même protocole à l’ombre et au soleil, avec support réel, reflets et éventuelles modifications du visuel.
Un succès en intérieur ne garantit pas la fiabilité extérieure. Une façade en volume ou un motif répétitif est moins adapté qu’une image plane distinctive. La démonstration officielle est une cible de démarrage, pas une référence de performance maximale.

## Licences et provenance
MindAR : https://github.com/hiukim/mind-ar-js (MIT, licence conservée dans vendor).
A-Frame : https://github.com/aframevr/aframe (MIT, licence conservée dans vendor).
Image et cible officielles : https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png et card.mind.
Seule la métadonnée d’orientation EXIF du PNG a été retirée pour présenter ses pixels sans rotation automatique ; les pixels n’ont pas été modifiés.
Conserver les avis de licence lors de la redistribution. Pour les futurs tableaux/fresques, les droits sur les images sont distincts de la licence du logiciel.
