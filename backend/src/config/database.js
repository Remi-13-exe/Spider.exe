import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Chargement des variables d’environnement
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Vérification des variables obligatoires
const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Variable d'environnement manquante : ${envVar}`);
    process.exit(1);
  }
});

// Création du pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction de test de connexion
export const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion MySQL réussie');
    connection.release();
  } catch (error) {
    console.error('❌ Erreur de connexion MySQL :', error.message);
    process.exit(1);
  }
};

export default pool;