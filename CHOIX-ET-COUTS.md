# Choix rapide et coûts — vérification du 14 octobre 2026

| Solution | Coût logiciel et usage | Intégration pour ce test | Safari et stabilité |
|---|---|---|---|
| MindAR + A-Frame | MIT, pas d’abonnement ni quota facturé par cible/reconnaissance ; usage commercial permis avec notices | Retenue : page statique et cible .mind officielle | WebGL + caméra HTTPS ; essai iPhone réel requis ; dépend du visuel, de la lumière et du mouvement |
| AR.js | Open source gratuit ; vérifier les notices des composants du build choisi avant distribution | Alternative NFT image tracking, préparation de descripteurs supplémentaire | Navigateur WebGL/WebRTC ; coût CPU du suivi image ; aucune supériorité de stabilité mesurée ici |
| A-Frame / Three.js | MIT, usage commercial possible | Moteurs d’affichage, pas de reconnaissance d’images à eux seuls | L’affichage doit être couplé à MindAR ou un autre moteur de suivi |
| 8th Wall actuel | Site officiel : outils gratuits ; MIT pour les composants ouverts et licence d’usage limitée pour le binaire XR, usage commercial autorisé dans une expérience plus large | Alternative réelle désormais gratuite ; non retenue pour éviter une seconde intégration | Image Targets disponibles ; stabilité comparative non testée |

8th Wall a retiré sa plateforme hébergée et terminé ses abonnements payants le 28 février 2026. Il ne faut donc pas reprendre les anciennes grilles tarifaires.

## Hébergement
GitHub Pages : 0 € avec dépôt public sur GitHub Free, sous-domaine HTTPS inclus. Limites : site 1 Go, bande passante souple 100 Go/mois, 10 builds/heure (exception pour workflow Actions personnalisé). Pas de facturation par image. Les conditions excluent l’utilisation comme hébergement gratuit d’un commerce en ligne ou d’un SaaS commercial : adapté ici au prototype, ne pas présumer que la version commerciale de QUEST pourra y rester.

Cloudflare Pages : alternative statique gratuite à examiner pour la phase commerciale ; 500 builds/mois, 20 000 fichiers, 25 Mio maximum par fichier sur le plan gratuit. Pas de Functions nécessaires. Aucun compte Cloudflare n’a été créé et aucun forfait payant n’a été souscrit pour ce prototype.

Passage de 1 à 10 images : coût de licence MindAR toujours nul ; le coût potentiel vient de l’hébergement si les limites du plan sont dépassées, pas de la reconnaissance. Le processeur et la batterie du téléphone sont sollicités. Pas de domaine payant nécessaire.

## Sources officielles
- https://github.com/hiukim/mind-ar-js
- https://hiukim.github.io/mind-ar-js-doc/quick-start/overview/
- https://ar-js-org.github.io/AR.js-Docs/
- https://aframe.io/docs/1.7.0/introduction/
- https://github.com/mrdoob/three.js/blob/dev/LICENSE
- https://8thwall.org/
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/pages/platform/limits/
