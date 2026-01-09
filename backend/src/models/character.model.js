import pool from '../config/database.js';

// READ ALL
export const getAllCharacters = async () => {
  const [rows] = await pool.query('SELECT * FROM characters');
  return rows;
};

// READ ONE
export const getCharacterById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [id]);
  return rows[0];
};

// CREATE
export const createCharacter = async (data) => {
  const { name, alias, biography, universe, creation_year, image_url } = data;
  const [result] = await pool.query(
    `INSERT INTO characters (name, alias, biography, universe, creation_year, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, alias, biography, universe, creation_year, image_url]
  );
  return result.insertId;
};

// UPDATE
export const updateCharacter = async (id, data) => {
  const { name, alias, biography, universe, creation_year, image_url } = data;
  await pool.query(
    `UPDATE characters 
     SET name = ?, alias = ?, biography = ?, universe = ?, creation_year = ?, image_url = ?
     WHERE id = ?`,
    [name, alias, biography, universe, creation_year, image_url, id]
  );
};

// DELETE
export const deleteCharacter = async (id) => {
  await pool.query('DELETE FROM characters WHERE id = ?', [id]);
};
