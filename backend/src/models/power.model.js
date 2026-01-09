import pool from '../config/database.js';

// READ ALL
export const getAllPowers = async () => {
  const [rows] = await pool.query('SELECT * FROM powers');
  return rows;
};

// READ BY ID
export const getPowerById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM powers WHERE id = ?', [id]);
  return rows[0];
};

// READ BY CHARACTER
export const getPowersByCharacterId = async (characterId) => {
  const [rows] = await pool.query(
    `SELECT p.* 
     FROM powers p
     JOIN character_powers cp ON cp.power_id = p.id
     WHERE cp.character_id = ?`,
    [characterId]
  );
  return rows;
};

// CREATE
export const createPower = async (data) => {
  const { name, description, type } = data;
  const [result] = await pool.query(
    'INSERT INTO powers (name, description, type) VALUES (?, ?, ?)',
    [name, description, type]
  );
  return result.insertId;
};

// UPDATE
export const updatePower = async (id, data) => {
  const { name, description, type } = data;
  await pool.query(
    'UPDATE powers SET name = ?, description = ?, type = ? WHERE id = ?',
    [name, description, type, id]
  );
};

// DELETE
export const deletePower = async (id) => {
  await pool.query('DELETE FROM powers WHERE id = ?', [id]);
};
