import pool from '../config/database.js';

// READ ALL
export const getAllAppearances = async () => {
  const [rows] = await pool.query(
    'SELECT id, character_id, title, type, year, description FROM appearances'
  );
  return rows;
};

// READ BY ID
export const getAppearanceById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, character_id, title, type, year, description FROM appearances WHERE id = ?',
    [id]
  );
  return rows[0];
};

// READ BY CHARACTER (avec jointure)
export const getAppearancesByCharacterId = async (characterId) => {
  const [rows] = await pool.query(
    `SELECT a.id, a.title, a.type, a.year, a.description,
            c.name AS character_name
     FROM appearances a
     JOIN characters c ON a.character_id = c.id
     WHERE a.character_id = ?`,
    [characterId]
  );
  return rows;
};

// CREATE
export const createAppearance = async (data) => {
  const { character_id, title, type, year, description } = data;

  const [result] = await pool.query(
    `INSERT INTO appearances 
     (character_id, title, type, year, description) 
     VALUES (?, ?, ?, ?, ?)`,
    [character_id, title, type, year, description]
  );

  return result.insertId;
};

// UPDATE
export const updateAppearance = async (id, data) => {
  const { character_id, title, type, year, description } = data;

  const [result] = await pool.query(
    `UPDATE appearances 
     SET character_id = ?, title = ?, type = ?, year = ?, description = ?
     WHERE id = ?`,
    [character_id, title, type, year, description, id]
  );

  return result.affectedRows;
};

// DELETE
export const deleteAppearance = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM appearances WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};