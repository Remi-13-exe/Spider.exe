import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion MySQL réussie');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Erreur MySQL:', err.message);
  });


export default pool;
