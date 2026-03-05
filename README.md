résentation

Spider.exe est une plateforme web encyclopédique dédiée à l’univers de Spider-Man.
Le projet a été réalisé dans le cadre du Titre Professionnel Développeur Web et Web Mobile (DWWM).

Il permet de :

Consulter des personnages

Afficher leurs pouvoirs et compétences

Visualiser leurs créateurs

Explorer leurs apparitions iconiques

Interroger une API REST sécurisée

🧱 Stack technique

Frontend

HTML5

CSS3

JavaScript (ES6)

Backend

Node.js

Express.js

Base de données

MySQL

📂 Structure du projet
backend/
frontend/
Backend

src/server.js

src/routes/

src/models/

src/config/database.js

Frontend

index.html

css/

js/

assets/

⚙️ Installation Backend
cd backend
npm install
Variables d'environnement

Créer un fichier .env :

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=***
DB_NAME=spiderexe
NODE_ENV=development
Lancer le serveur
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

📤 Exemple de réponse JSON
{
  "id": 1,
  "name": "Miles Morales",
  "alias": "Spider-Man",
  "universe": "Earth-1610",
  "powers": [
    "Venom Blast",
    "Camouflage biologique"
  ],
  "creators": [
    "Brian Michael Bendis",
    "Sara Pichelli"
  ]
}
🔒 Sécurité

Requêtes SQL paramétrées

Validation des données entrantes

Gestion centralisée des erreurs

Structure MVC

🧪 Tests
cd backend
npm test
📜 Licence & mentions

Projet pédagogique non commercial.
Non affilié à Marvel.
Contenus utilisés à des fins éducatives uniquement.