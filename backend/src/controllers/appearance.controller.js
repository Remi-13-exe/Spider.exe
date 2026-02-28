import * as appearanceModel from '../models/appearance.model.js';

// 🔹 GET /api/appearances
export const findAllAppearances = async (req, res) => {
  try {
    const appearances = await appearanceModel.getAllAppearances();
    res.status(200).json(appearances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/appearances/:id
export const findAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const appearance = await appearanceModel.getAppearanceById(id);

    if (!appearance) {
      return res.status(404).json({ message: 'Apparition non trouvée' });
    }

    res.status(200).json(appearance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/appearances/characters/:id
export const getAppearancesByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id);
    if (isNaN(characterId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const appearances = await appearanceModel.getAppearancesByCharacterId(characterId);
    res.status(200).json(appearances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/appearances
export const createNewAppearance = async (req, res) => {
  try {
    const { character_id, title, type, year } = req.body;

    if (!character_id || !title || !type) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    const id = await appearanceModel.createAppearance(req.body);

    res.status(201).json({
      message: 'Apparition créée',
      id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/appearances/:id
export const updateAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const updated = await appearanceModel.updateAppearance(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Apparition non trouvée' });
    }

    res.status(200).json({ message: 'Apparition mise à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/appearances/:id
export const deleteAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const deleted = await appearanceModel.deleteAppearance(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Apparition non trouvée' });
    }

    res.status(200).json({ message: 'Apparition supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};