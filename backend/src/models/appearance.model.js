import pool from '../config/database.js';

// 🔹 READ ALL
export const getAllAppearances = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM appearances');
    return rows;
  } catch (error) {
    console.error('[ERROR] getAllAppearances:', error.message);
    throw new Error('Impossible de récupérer les apparitions');
  }
};

// 🔹 READ BY ID
export const getAppearanceById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [rows] = await pool.query('SELECT * FROM appearances WHERE id = ?', [parsedId]);
    return rows[0];
  } catch (error) {
    console.error('[ERROR] getAppearanceById:', error.message);
    throw new Error('Impossible de récupérer l’apparition');
  }
};

// 🔹 READ BY CHARACTER
export const getAppearancesByCharacterId = async (characterId) => {
  const parsedId = parseInt(characterId, 10);
  if (isNaN(parsedId)) throw new Error('ID de personnage invalide');

  try {
    const [rows] = await pool.query(
      'SELECT * FROM appearances WHERE character_id = ?',
      [parsedId]
    );
    return rows;
  } catch (error) {
    console.error('[ERROR] getAppearancesByCharacterId:', error.message);
    throw new Error('Impossible de récupérer les apparitions du personnage');
  }
};

// 🔹 CREATE
export const createAppearance = async (data) => {
  const { character_id, title, type, year, description } = data;
  if (!character_id || !title || !type || !year) {
    throw new Error('Données manquantes pour créer l’apparition');
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO appearances (character_id, title, type, year, description) VALUES (?, ?, ?, ?, ?)',
      [character_id, title, type, year, description || null]
    );
    return result.insertId;
  } catch (error) {
    console.error('[ERROR] createAppearance:', error.message);
    throw new Error('Impossible de créer l’apparition');
  }
};

// 🔹 UPDATE
export const updateAppearance = async (id, data) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  const { character_id, title, type, year, description } = data;
  if (!character_id || !title || !type || !year) {
    throw new Error('Données manquantes pour mettre à jour l’apparition');
  }

  try {
    const [result] = await pool.query(
      'UPDATE appearances SET character_id = ?, title = ?, type = ?, year = ?, description = ? WHERE id = ?',
      [character_id, title, type, year, description || null, parsedId]
    );
    return result;
  } catch (error) {
    console.error('[ERROR] updateAppearance:', error.message);
    throw new Error('Impossible de mettre à jour l’apparition');
  }
};

// 🔹 DELETE
export const deleteAppearance = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [result] = await pool.query('DELETE FROM appearances WHERE id = ?', [parsedId]);
    return result;
  } catch (error) {
    console.error('[ERROR] deleteAppearance:', error.message);
    throw new Error('Impossible de supprimer l’apparition');
  }
};