import * as appearanceModel from '../models/appearance.model.js';

// 🔹 GET /api/appearances
export const findAllAppearances = async (req, res) => {
  try {
    const appearances = await appearanceModel.getAllAppearances();
    res.status(200).json(appearances);
  } catch (err) {
    console.error('[ERROR] findAllAppearances:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des apparitions' });
  }
};

// 🔹 GET /api/appearances/:id
export const findAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const appearance = await appearanceModel.getAppearanceById(id);
    if (!appearance) return res.status(404).json({ message: 'Apparition non trouvée' });

    res.status(200).json(appearance);
  } catch (err) {
    console.error('[ERROR] findAppearanceById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l’apparition' });
  }
};

// 🔹 GET /api/appearances/characters/:id
export const getAppearancesByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id, 10);
    if (isNaN(characterId)) return res.status(400).json({ error: 'ID de personnage invalide' });

    const appearances = await appearanceModel.getAppearancesByCharacterId(characterId);
    res.status(200).json(appearances);
  } catch (err) {
    console.error('[ERROR] getAppearancesByCharacter:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des apparitions du personnage' });
  }
};

// 🔹 POST /api/appearances
export const createNewAppearance = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour créer l’apparition' });
    }

    const id = await appearanceModel.createAppearance(data);
    res.status(201).json({ message: 'Apparition créée', id });
  } catch (err) {
    console.error('[ERROR] createNewAppearance:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l’apparition' });
  }
};

// 🔹 PUT /api/appearances/:id
export const updateAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour mettre à jour l’apparition' });
    }

    const updated = await appearanceModel.updateAppearance(id, data);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: 'Apparition non trouvée pour mise à jour' });
    }

    res.status(200).json({ message: 'Apparition mise à jour' });
  } catch (err) {
    console.error('[ERROR] updateAppearanceById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de l’apparition' });
  }
};

// 🔹 DELETE /api/appearances/:id
export const deleteAppearanceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const deleted = await appearanceModel.deleteAppearance(id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Apparition non trouvée pour suppression' });
    }

    res.status(200).json({ message: 'Apparition supprimée' });
  } catch (err) {
    console.error('[ERROR] deleteAppearanceById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression de l’apparition' });
  }
};