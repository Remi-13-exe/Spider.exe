import pool from '../config/database.js';

// READ ALL (avec pagination + filtre univers)
export const getAllCharacters = async (limit = 10, offset = 0, universe = null) => {

  let query = `
    SELECT id, name, alias, biography, universe, creation_year, image_url
    FROM characters
  `;

  const params = [];

  if (universe) {
    query += ' WHERE universe = ?';
    params.push(universe);
  }

  query += ' ORDER BY creation_year DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const [rows] = await pool.query(query, params);
  return rows;
};

// READ ONE
export const getCharacterById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, name, alias, biography, universe, creation_year, image_url
     FROM characters
     WHERE id = ?`,
    [id]
  );
  return rows[0];
};

// CREATE
export const createCharacter = async (data) => {
  const { name, alias, biography, universe, creation_year, image_url } = data;

  const [result] = await pool.query(
    `INSERT INTO characters 
     (name, alias, biography, universe, creation_year, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, alias, biography, universe, creation_year, image_url]
  );

  return result.insertId;
};

// UPDATE
export const updateCharacter = async (id, data) => {
  const { name, alias, biography, universe, creation_year, image_url } = data;

  const [result] = await pool.query(
    `UPDATE characters 
     SET name = ?, alias = ?, biography = ?, universe = ?, creation_year = ?, image_url = ?
     WHERE id = ?`,
    [name, alias, biography, universe, creation_year, image_url, id]
  );

  return result.affectedRows;
};

// DELETE
export const deleteCharacter = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM characters WHERE id = ?',
    [id]
  );

  return result.affectedRows;
};