import app from './app.js';   // Import de l'application Express configurée
import dotenv from 'dotenv';  // Pour charger les variables d'environnement depuis .env

// Chargement des variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Vérification des variables obligatoires
const requiredEnv = ['PORT', 'JWT_SECRET'];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Variable d'environnement manquante : ${envVar}`);
    process.exit(1);
  }
});

// Définition du port
const PORT = process.env.PORT;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🕷️ Server running on http://localhost:${PORT}`);
});
