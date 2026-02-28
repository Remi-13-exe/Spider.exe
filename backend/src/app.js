import express from 'express';
import cors from 'cors'; // Pour permettre les requêtes cross-origin (front/back sur différents ports)
import characterRoutes from './routes/character.routes.js';
import powerRoutes from './routes/power.routes.js';
import creatorRoutes from './routes/creator.routes.js';
import appearanceRoutes from './routes/appearance.routes.js';

const app = express();

// ⚡ Middleware global pour CORS
// Permet à notre frontend d'accéder à l'API depuis un autre domaine ou port
app.use(cors());

// ⚡ Middleware pour parser le JSON
// Toutes les requêtes POST/PUT avec un body JSON seront automatiquement parsées
app.use(express.json());

// 🔹 Routes principales de l'API
// Chaque route correspond à un module REST CRUD pour la ressource
app.use('/api/characters', characterRoutes); // Gestion des personnages
app.use('/api/powers', powerRoutes);         // Gestion des pouvoirs
app.use('/api/creators', creatorRoutes);     // Gestion des créateurs
app.use('/api/appearances', appearanceRoutes); // Gestion des apparitions

// ✅ Export de l'application Express
// sera importée dans server.js pour démarrer le serveur
export default app;