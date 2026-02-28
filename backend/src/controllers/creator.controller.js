import * as creatorModel from '../models/creator.model.js';

// 🔹 GET /api/creators
export const findAllCreators = async (req, res) => {
  try {
    const creators = await creatorModel.getAllCreators();
    res.status(200).json(creators);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/creators/:id
export const findCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const creator = await creatorModel.getCreatorById(id);
    if (!creator) {
      return res.status(404).json({ message: 'Créateur non trouvé' });
    }

    res.status(200).json(creator);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 GET /api/creators/characters/:id
export const getCreatorsByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id);
    if (isNaN(characterId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const creators = await creatorModel.getCreatorsByCharacterId(characterId);
    res.status(200).json(creators);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 POST /api/creators
export const createNewCreator = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: 'Nom et rôle requis' });
    }

    const id = await creatorModel.createCreator(req.body);

    res.status(201).json({
      message: 'Créateur créé',
      id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 PUT /api/creators/:id
export const updateCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const creator = await creatorModel.getCreatorById(id);
    if (!creator) {
      return res.status(404).json({ message: 'Créateur non trouvé' });
    }

    await creatorModel.updateCreator(id, req.body);

    res.status(200).json({ message: 'Créateur mis à jour' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 DELETE /api/creators/:id
export const deleteCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const creator = await creatorModel.getCreatorById(id);
    if (!creator) {
      return res.status(404).json({ message: 'Créateur non trouvé' });
    }

    await creatorModel.deleteCreator(id);

    res.status(200).json({ message: 'Créateur supprimé' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};