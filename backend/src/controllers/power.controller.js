import * as powerModel from '../models/power.model.js';

// 🔹 GET /api/powers
export const findAllPowers = async (req, res) => {
  try {
    const powers = await powerModel.getAllPowers();
    res.status(200).json(powers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/powers/:id
export const findPowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const power = await powerModel.getPowerById(id);
    if (!power) {
      return res.status(404).json({ message: 'Pouvoir non trouvé' });
    }

    res.status(200).json(power);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/powers/characters/:id
export const getPowersByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id);
    if (isNaN(characterId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const powers = await powerModel.getPowersByCharacterId(characterId);
    res.status(200).json(powers);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/powers
export const createNewPower = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Nom et description requis' });
    }

    const id = await powerModel.createPower(req.body);

    res.status(201).json({
      message: 'Pouvoir créé',
      id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/powers/:id
export const updatePowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const power = await powerModel.getPowerById(id);
    if (!power) {
      return res.status(404).json({ message: 'Pouvoir non trouvé' });
    }

    await powerModel.updatePower(id, req.body);

    res.status(200).json({ message: 'Pouvoir mis à jour' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/powers/:id
export const deletePowerById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const power = await powerModel.getPowerById(id);
    if (!power) {
      return res.status(404).json({ message: 'Pouvoir non trouvé' });
    }

    await powerModel.deletePower(id);

    res.status(200).json({ message: 'Pouvoir supprimé' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};