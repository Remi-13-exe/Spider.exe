import pool from '../config/database.js';

// READ ALL
export const getAllAppearances = async () => {
  const [rows] = await pool.query('SELECT * FROM appearances');
  return rows;
};

// READ BY ID
export const getAppearanceById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM appearances WHERE id = ?', [id]);
  return rows[0];
};

// READ BY CHARACTER
export const getAppearancesByCharacterId = async (characterId) => {
  const [rows] = await pool.query(
    'SELECT * FROM appearances WHERE character_id = ?',
    [characterId]
  );
  return rows;
};

// CREATE
export const createAppearance = async (data) => {
  const { character_id, title, type, year, description } = data;
  const [result] = await pool.query(
    'INSERT INTO appearances (character_id, title, type, year, description) VALUES (?, ?, ?, ?, ?)',
    [character_id, title, type, year, description]
  );
  return result.insertId;
};

// UPDATE
export const updateAppearance = async (id, data) => {
  const { character_id, title, type, year, description } = data;
  await pool.query(
    'UPDATE appearances SET character_id = ?, title = ?, type = ?, year = ?, description = ? WHERE id = ?',
    [character_id, title, type, year, description, id]
  );
};

// DELETE
export const deleteAppearance = async (id) => {
  await pool.query('DELETE FROM appearances WHERE id = ?', [id]);
};
