import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/character.routes.js';
import powerRoutes from './routes/power.routes.js';
import creatorRoutes from './routes/creator.routes.js';
import appearanceRoutes from './routes/appearance.routes.js';

const app = express();

// ⚡ Middleware global pour CORS
// Permet au frontend d'accéder à l'API depuis un autre domaine ou port
app.use(cors({
  origin: '*', // Ajuster en production pour limiter les origines autorisées
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ⚡ Middleware pour parser le JSON
// Toutes les requêtes POST/PUT avec un body JSON seront automatiquement parsées
app.use(express.json());

// ⚡ Middleware pour parser les URL-encoded data (formulaires HTML)
app.use(express.urlencoded({ extended: true }));

// 🔹 Routes principales de l'API
app.use('/api/characters', characterRoutes);     // Gestion des personnages
app.use('/api/powers', powerRoutes);             // Gestion des pouvoirs
app.use('/api/creators', creatorRoutes);         // Gestion des créateurs
app.use('/api/appearances', appearanceRoutes);   // Gestion des apparitions

// 🔹 Middleware de gestion des routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// 🔹 Middleware de gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error('[ERROR GLOBAL]', err.stack || err.message);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

// ✅ Export de l'application Express
export default app;