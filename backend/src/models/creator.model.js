import pool from '../config/database.js';

// READ ALL
export const getAllCreators = async () => {
  const [rows] = await pool.query('SELECT * FROM creators');
  return rows;
};

// READ BY ID
export const getCreatorById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM creators WHERE id = ?', [id]);
  return rows[0];
};

// READ BY CHARACTER
export const getCreatorsByCharacterId = async (characterId) => {
  const [rows] = await pool.query(
    `SELECT c.*
     FROM creators c
     JOIN character_creators cc ON cc.creator_id = c.id
     WHERE cc.character_id = ?`,
    [characterId]
  );
  return rows;
};

// CREATE
export const createCreator = async (data) => {
  const { name, role } = data;
  const [result] = await pool.query(
    'INSERT INTO creators (name, role) VALUES (?, ?)',
    [name, role]
  );
  return result.insertId;
};

// UPDATE
export const updateCreator = async (id, data) => {
  const { name, role } = data;
  await pool.query('UPDATE creators SET name = ?, role = ? WHERE id = ?', [name, role, id]);
};

// DELETE
export const deleteCreator = async (id) => {
  await pool.query('DELETE FROM creators WHERE id = ?', [id]);
};
