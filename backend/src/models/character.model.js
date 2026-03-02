import pool from '../config/database.js';

// 🔹 READ ALL
export const getAllCharacters = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM characters');
    return rows;
  } catch (error) {
    console.error('[ERROR] getAllCharacters:', error.message);
    throw new Error('Impossible de récupérer les personnages');
  }
};

// 🔹 READ ONE
export const getCharacterById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [parsedId]);
    return rows[0];
  } catch (error) {
    console.error('[ERROR] getCharacterById:', error.message);
    throw new Error('Impossible de récupérer le personnage');
  }
};

// 🔹 CREATE
export const createCharacter = async (data) => {
  const { name, alias, biography, universe, creation_year, image_url } = data;

  if (!name || !alias || !universe || !creation_year) {
    throw new Error('Données manquantes pour créer le personnage');
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO characters (name, alias, biography, universe, creation_year, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, alias, biography || null, universe, creation_year, image_url || null]
    );
    return result.insertId;
  } catch (error) {
    console.error('[ERROR] createCharacter:', error.message);
    throw new Error('Impossible de créer le personnage');
  }
};

// 🔹 UPDATE
export const updateCharacter = async (id, data) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  const { name, alias, biography, universe, creation_year, image_url } = data;
  if (!name || !alias || !universe || !creation_year) {
    throw new Error('Données manquantes pour mettre à jour le personnage');
  }

  try {
    const [result] = await pool.query(
      `UPDATE characters 
       SET name = ?, alias = ?, biography = ?, universe = ?, creation_year = ?, image_url = ?
       WHERE id = ?`,
      [name, alias, biography || null, universe, creation_year, image_url || null, parsedId]
    );
    return result;
  } catch (error) {
    console.error('[ERROR] updateCharacter:', error.message);
    throw new Error('Impossible de mettre à jour le personnage');
  }
};

// 🔹 DELETE
export const deleteCharacter = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [result] = await pool.query('DELETE FROM characters WHERE id = ?', [parsedId]);
    return result;
  } catch (error) {
    console.error('[ERROR] deleteCharacter:', error.message);
    throw new Error('Impossible de supprimer le personnage');
  }
};