import app from './app.js';   // Import de l'application Express configurée
import dotenv from 'dotenv';  // Pour charger les variables d'environnement depuis .env

// ⚡ Chargement des variables d'environnement
dotenv.config();

// ⚡ Définition du port du serveur
// On prend la variable PORT dans le .env, sinon 3000 par défaut
const PORT = process.env.PORT || 3000;

// 🔹 Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🕷️ Server running on http://localhost:${PORT}`);
  // Message visible dans la console pour confirmer que le serveur est actif
});