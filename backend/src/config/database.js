import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// On force dotenv à charger le .env depuis la racine du projet
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Création du pool de connexions MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Test de connexion
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion MySQL réussie');
    connection.release();
  } catch (err) {
    console.error('❌ Erreur MySQL:', err.message);
  }

  // Affichage des variables d'environnement pour debug
  console.log('USER    :', process.env.DB_USER);
  console.log('PASSWORD:', process.env.DB_PASSWORD ? '✅ défini' : '❌ vide');
  console.log('HOST    :', process.env.DB_HOST);
  console.log('DB      :', process.env.DB_NAME);
})();

export default pool;
