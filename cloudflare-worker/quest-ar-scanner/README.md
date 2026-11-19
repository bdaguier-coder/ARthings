# QUEST AR Scanner — archive du Worker Cloudflare

Cette copie contient le code actuellement déployé sous le Worker `quest-ar-scanner`, récupéré le 19 novembre 2026. Le fichier `worker.js` embarque le catalogue public et les ressources statiques de cette version.

Le Worker source est indépendant : sa configuration Cloudflare ne déclare aucune liaison D1, R2, KV ou secret. Le Scanner sert le catalogue public via `/api/public/catalogue` et répond aux ressources statiques.

Cette sauvegarde ne remplace pas le dépôt historique `ARthings`, ne modifie pas le Worker en production et ne constitue pas la migration du Studio. Les 72 fichiers référencés par la base du Studio — images, cibles de reconnaissance, modèles 3D, PDF et audio — doivent encore être exportés avec l'état des expériences et transférés vers le stockage Cloudflare du projet.
