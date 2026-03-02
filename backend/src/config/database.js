import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Chargement des variables d’environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Petite fonction pour afficher un loader animé
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
const step = async (text) => {
  for (let i = 0; i < 8; i++) {
    process.stdout.write(`\r${frames[i]} ${text}`);
    await wait(80);
  }
  process.stdout.write(`\r✔️ ${text}\n`);
};

// Vérification stricte des variables obligatoires
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar] || process.env[envVar].trim() === '') {
    console.error(`\n❌ [ENV ERROR] Variable manquante ou vide : ${envVar}\n`);
    process.exit(1);
  }
});

// Animation de chargement
console.log("\n===========================================");
console.log(" 🚀 Initialisation de la base de données...");
console.log("===========================================\n");

await step("Chargement des variables d'environnement");
await step("Configuration du pool MySQL");
await step("Préparation de la connexion");

// Création du pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction de test de connexion
export const testDatabaseConnection = async () => {
  let connection;
  try {
    await step("Connexion à MySQL en cours...");
    connection = await pool.getConnection();
    console.log("\n🟢 [DATABASE] Connexion MySQL réussie !");
  } catch (error) {
    console.error("\n🔴 [DATABASE ERROR] Erreur de connexion MySQL :");
    console.error(error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
};

// Export du pool pour utilisation dans le reste du backend
export default pool;