import * as appearanceModel from '../models/appearance.model.js';

// 🔹 GET /api/appearances
export const findAllAppearances = async (req, res) => {
  try {
    const appearances = await appearanceModel.getAllAppearances();
    res.status(200).json(appearances);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/appearances/:id
export const findAppearanceById = async (req, res) => {
  try {
    const appearance = await appearanceModel.getAppearanceById(req.params.id);
    if (!appearance) return res.status(404).json({ message: 'Apparition non trouvée' });
    res.status(200).json(appearance);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/appearances/characters/:id
export const getAppearancesByCharacter = async (req, res) => {
  try {
    const appearances = await appearanceModel.getAppearancesByCharacterId(req.params.id);
    res.status(200).json(appearances);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/appearances
export const createNewAppearance = async (req, res) => {
  try {
    const id = await appearanceModel.createAppearance(req.body);
    res.status(201).json({ message: 'Apparition créée', id });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/appearances/:id
export const updateAppearanceById = async (req, res) => {
  try {
    await appearanceModel.updateAppearance(req.params.id, req.body);
    res.status(200).json({ message: 'Apparition mise à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/appearances/:id
export const deleteAppearanceById = async (req, res) => {
  try {
    await appearanceModel.deleteAppearance(req.params.id);
    res.status(200).json({ message: 'Apparition supprimée' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
