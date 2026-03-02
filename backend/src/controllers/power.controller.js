import * as powerModel from '../models/power.model.js';

// 🔹 GET /api/powers
export const findAllPowers = async (req, res) => {
  try {
    const powers = await powerModel.getAllPowers();
    res.status(200).json(powers);
  } catch (err) {
    console.error('[ERROR] findAllPowers:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des pouvoirs' });
  }
};

// 🔹 GET /api/powers/:id
export const findPowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const power = await powerModel.getPowerById(id);
    if (!power) return res.status(404).json({ message: 'Pouvoir non trouvé' });

    res.status(200).json(power);
  } catch (err) {
    console.error('[ERROR] findPowerById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du pouvoir' });
  }
};

// 🔹 GET /api/powers/characters/:id
export const getPowersByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id, 10);
    if (isNaN(characterId)) return res.status(400).json({ error: 'ID de personnage invalide' });

    const powers = await powerModel.getPowersByCharacterId(characterId);
    res.status(200).json(powers);
  } catch (err) {
    console.error('[ERROR] getPowersByCharacter:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des pouvoirs du personnage' });
  }
};

// 🔹 POST /api/powers
export const createNewPower = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour créer le pouvoir' });
    }

    const id = await powerModel.createPower(data);
    res.status(201).json({ message: 'Pouvoir créé', id });
  } catch (err) {
    console.error('[ERROR] createNewPower:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la création du pouvoir' });
  }
};

// 🔹 PUT /api/powers/:id
export const updatePowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour mettre à jour le pouvoir' });
    }

    const updated = await powerModel.updatePower(id, data);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: 'Pouvoir non trouvé pour mise à jour' });
    }

    res.status(200).json({ message: 'Pouvoir mis à jour' });
  } catch (err) {
    console.error('[ERROR] updatePowerById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du pouvoir' });
  }
};

// 🔹 DELETE /api/powers/:id
export const deletePowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const deleted = await powerModel.deletePower(id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Pouvoir non trouvé pour suppression' });
    }

    res.status(200).json({ message: 'Pouvoir supprimé' });
  } catch (err) {
    console.error('[ERROR] deletePowerById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du pouvoir' });
  }
};