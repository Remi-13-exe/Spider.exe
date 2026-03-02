import pool from '../config/database.js';

// 🔹 READ ALL
export const getAllCreators = async () => {
  try {
    const [rows] = await pool.query('SELECT id, name, role FROM creators');
    return rows;
  } catch (error) {
    console.error('[ERROR] getAllCreators:', error.message);
    throw new Error('Impossible de récupérer les créateurs');
  }
};

// 🔹 READ BY ID
export const getCreatorById = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [rows] = await pool.query(
      'SELECT id, name, role FROM creators WHERE id = ?',
      [parsedId]
    );
    return rows[0];
  } catch (error) {
    console.error('[ERROR] getCreatorById:', error.message);
    throw new Error('Impossible de récupérer le créateur');
  }
};

// 🔹 READ BY CHARACTER (many-to-many optimisé)
export const getCreatorsByCharacterId = async (characterId) => {
  const parsedId = parseInt(characterId, 10);
  if (isNaN(parsedId)) throw new Error('ID de personnage invalide');

  try {
    const [rows] = await pool.query(
      `SELECT DISTINCT c.id, c.name, c.role
       FROM creators c
       JOIN character_creators cc ON cc.creator_id = c.id
       WHERE cc.character_id = ?`,
      [parsedId]
    );
    return rows;
  } catch (error) {
    console.error('[ERROR] getCreatorsByCharacterId:', error.message);
    throw new Error('Impossible de récupérer les créateurs du personnage');
  }
};

// 🔹 CREATE
export const createCreator = async (data) => {
  const { name, role } = data;
  if (!name || !role) throw new Error('Données manquantes pour créer le créateur');

  try {
    const [result] = await pool.query(
      'INSERT INTO creators (name, role) VALUES (?, ?)',
      [name, role]
    );
    return result.insertId;
  } catch (error) {
    console.error('[ERROR] createCreator:', error.message);
    throw new Error('Impossible de créer le créateur');
  }
};

// 🔹 UPDATE
export const updateCreator = async (id, data) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  const { name, role } = data;
  if (!name || !role) throw new Error('Données manquantes pour mettre à jour le créateur');

  try {
    const [result] = await pool.query(
      'UPDATE creators SET name = ?, role = ? WHERE id = ?',
      [name, role, parsedId]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('[ERROR] updateCreator:', error.message);
    throw new Error('Impossible de mettre à jour le créateur');
  }
};

// 🔹 DELETE
export const deleteCreator = async (id) => {
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) throw new Error('ID invalide');

  try {
    const [result] = await pool.query('DELETE FROM creators WHERE id = ?', [parsedId]);
    return result.affectedRows;
  } catch (error) {
    console.error('[ERROR] deleteCreator:', error.message);
    throw new Error('Impossible de supprimer le créateur');
  }
};