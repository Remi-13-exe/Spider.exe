import * as creatorModel from '../models/creator.model.js';

// 🔹 GET /api/creators
export const findAllCreators = async (req, res) => {
  try {
    const creators = await creatorModel.getAllCreators();
    res.status(200).json(creators);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/creators/:id
export const findCreatorById = async (req, res) => {
  try {
    const creator = await creatorModel.getCreatorById(req.params.id);
    if (!creator) return res.status(404).json({ message: 'Créateur non trouvé' });
    res.status(200).json(creator);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/creators/characters/:id
export const getCreatorsByCharacter = async (req, res) => {
  try {
    const creators = await creatorModel.getCreatorsByCharacterId(req.params.id);
    res.status(200).json(creators);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/creators
export const createNewCreator = async (req, res) => {
  try {
    const id = await creatorModel.createCreator(req.body);
    res.status(201).json({ message: 'Créateur créé', id });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/creators/:id
export const updateCreatorById = async (req, res) => {
  try {
    await creatorModel.updateCreator(req.params.id, req.body);
    res.status(200).json({ message: 'Créateur mis à jour' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/creators/:id
export const deleteCreatorById = async (req, res) => {
  try {
    await creatorModel.deleteCreator(req.params.id);
    res.status(200).json({ message: 'Créateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
