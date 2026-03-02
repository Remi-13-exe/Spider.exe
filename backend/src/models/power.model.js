import pool from '../config/database.js';

// 🔹 READ ALL
export const getAllPowers = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM powers');
    return rows;
  } catch (error) {
    console.error('[ERROR] getAllPowers:', error.message);
    throw new Error('Impossible de récupérer les pouvoirs');
  }
};

// 🔹 READ BY ID
export const getPowerById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [rows] = await pool.query('SELECT * FROM powers WHERE id = ?', [parsedId]);
    return rows[0];
  } catch (error) {
    console.error('[ERROR] getPowerById:', error.message);
    throw new Error('Impossible de récupérer le pouvoir');
  }
};

// 🔹 READ BY CHARACTER
export const getPowersByCharacterId = async (characterId) => {
  const parsedId = parseInt(characterId, 10);
  if (isNaN(parsedId)) throw new Error('ID de personnage invalide');

  try {
    const [rows] = await pool.query(
      `SELECT p.* 
       FROM powers p
       JOIN character_powers cp ON cp.power_id = p.id
       WHERE cp.character_id = ?`,
      [parsedId]
    );
    return rows;
  } catch (error) {
    console.error('[ERROR] getPowersByCharacterId:', error.message);
    throw new Error('Impossible de récupérer les pouvoirs du personnage');
  }
};

// 🔹 CREATE
export const createPower = async (data) => {
  const { name, description, type } = data;
  if (!name || !type) throw new Error('Données manquantes pour créer le pouvoir');

  try {
    const [result] = await pool.query(
      'INSERT INTO powers (name, description, type) VALUES (?, ?, ?)',
      [name, description || null, type]
    );
    return result.insertId;
  } catch (error) {
    console.error('[ERROR] createPower:', error.message);
    throw new Error('Impossible de créer le pouvoir');
  }
};

// 🔹 UPDATE
export const updatePower = async (id, data) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  const { name, description, type } = data;
  if (!name || !type) throw new Error('Données manquantes pour mettre à jour le pouvoir');

  try {
    const [result] = await pool.query(
      'UPDATE powers SET name = ?, description = ?, type = ? WHERE id = ?',
      [name, description || null, type, parsedId]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('[ERROR] updatePower:', error.message);
    throw new Error('Impossible de mettre à jour le pouvoir');
  }
};

// 🔹 DELETE
export const deletePower = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [result] = await pool.query('DELETE FROM powers WHERE id = ?', [parsedId]);
    return result.affectedRows;
  } catch (error) {
    console.error('[ERROR] deletePower:', error.message);
    throw new Error('Impossible de supprimer le pouvoir');
  }
};