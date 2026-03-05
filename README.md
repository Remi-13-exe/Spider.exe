🕷️ Spider.exe — Encyclopédie Spider-Man
📌 Présentation

Spider.exe est une plateforme web encyclopédique interactive dédiée à l’univers de Spider-Man.
Ce projet a été réalisé dans le cadre du Titre Professionnel Développeur Web et Web Mobile (DWWM).

Avec Spider.exe, les utilisateurs peuvent :

Explorer tous les personnages de Spider-Man, y compris leurs alias et univers.

Consulter les pouvoirs et compétences spécifiques de chaque héros ou vilain.

Découvrir les créateurs des personnages (scénaristes, illustrateurs, studios).

Visualiser leurs apparitions iconiques dans les comics, films, séries et jeux vidéo.

Accéder aux dernières actualités et nouveautés autour de l’univers Spider-Man.

Interagir avec une API REST sécurisée pour récupérer dynamiquement les données.

Cette plateforme vise à être un outil complet et accessible pour les fans, qu’ils soient novices ou passionnés de longue date.

🧱 Stack technique
Frontend

HTML5

CSS3

JavaScript (ES6)

Backend

Node.js

Express.js

Base de données

MySQL (Railway)

Hébergement

Frontend : GitHub Pages

Backend : Render

Base : Railway MySQL

📂 Structure du projet
Spider.exe/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
│
├── index.html
├── css/
├── js/
├── assets/
├── README.md
└── spider.sql
⚙️ Installation Backend (local / test)
cd backend
npm install
Variables d'environnement

Créer un fichier .env :

PORT=3000
DB_HOST=switchyard.proxy.rlwy.net
DB_PORT=28688
DB_USER=root
DB_PASSWORD=IYRCijxTfUGGaFLfIRSdWjrfniNFPjbM
DB_NAME=railway
NODE_ENV=development
Lancer le serveur local
node src/server.js
🔌 Endpoints API
Personnages

GET /api/characters

GET /api/characters/:id

POST /api/characters

PUT /api/characters/:id

DELETE /api/characters/:id

Créateurs

GET /api/creators

Pouvoirs

GET /api/powers

Apparitions

GET /api/appearances

GET /api/characters/:id/appearances

📤 Exemple de réponse JSON
[
  {
    "id": 1,
    "character_id": 1,
    "title": "The Amazing Fantasy #15",
    "type": "comic",
    "year": 1962,
    "description": "Première apparition de Spider-Man"
  },
  {
    "id": 2,
    "character_id": 1,
    "title": "The Amazing Spider-Man #11",
    "type": "comic",
    "year": 1964,
    "description": null
  },
  {
    "id": 3,
    "character_id": 1,
    "title": "Spider-Verse",
    "type": "comic",
    "year": 2014,
    "description": null
  }
]
🔒 Sécurité

Requêtes SQL paramétrées pour éviter l’injection

Validation des données entrantes

Gestion centralisée des erreurs

Architecture MVC claire

🧪 Tests
cd backend
npm test
🚀 Déploiement
Backend → Render

Branch : main

Root Directory : backend

Build Command : npm install

Start Command : npm start

Variables d’environnement : DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV

URL de prod : https://spider-exe.onrender.com

Base de données → Railway

MySQL hébergé sur Railway

Tables : characters, powers, creators, appearances, etc.

Connexion configurée dans .env du backend

Frontend → GitHub Pages

Déployer à la racine du repo pour que index.html soit accessible directement via :
https://remi-13-exe.github.io/Spider.exe/

Vérifier que tous les fetch pointent vers le backend Render :

fetch('https://spider-exe.onrender.com/api/characters')
📜 Licence & mentions

Projet pédagogique non commercial

Non affilié à Marvel

Contenus utilisés à des fins éducatives uniquement