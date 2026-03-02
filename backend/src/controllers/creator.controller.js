import * as creatorModel from '../models/creator.model.js';

// 🔹 GET /api/creators
export const findAllCreators = async (req, res) => {
  try {
    const creators = await creatorModel.getAllCreators();
    res.status(200).json(creators);
  } catch (err) {
    console.error('[ERROR] findAllCreators:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des créateurs' });
  }
};

// 🔹 GET /api/creators/:id
export const findCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const creator = await creatorModel.getCreatorById(id);
    if (!creator) return res.status(404).json({ message: 'Créateur non trouvé' });

    res.status(200).json(creator);
  } catch (err) {
    console.error('[ERROR] findCreatorById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du créateur' });
  }
};

// 🔹 GET /api/creators/characters/:id
export const getCreatorsByCharacter = async (req, res) => {
  try {
    const characterId = parseInt(req.params.id, 10);
    if (isNaN(characterId)) return res.status(400).json({ error: 'ID de personnage invalide' });

    const creators = await creatorModel.getCreatorsByCharacterId(characterId);
    res.status(200).json(creators);
  } catch (err) {
    console.error('[ERROR] getCreatorsByCharacter:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des créateurs du personnage' });
  }
};

// 🔹 POST /api/creators
export const createNewCreator = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour créer le créateur' });
    }

    const id = await creatorModel.createCreator(data);
    res.status(201).json({ message: 'Créateur créé', id });
  } catch (err) {
    console.error('[ERROR] createNewCreator:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la création du créateur' });
  }
};

// 🔹 PUT /api/creators/:id
export const updateCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour mettre à jour le créateur' });
    }

    const updated = await creatorModel.updateCreator(id, data);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: 'Créateur non trouvé pour mise à jour' });
    }

    res.status(200).json({ message: 'Créateur mis à jour' });
  } catch (err) {
    console.error('[ERROR] updateCreatorById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du créateur' });
  }
};

// 🔹 DELETE /api/creators/:id
export const deleteCreatorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const deleted = await creatorModel.deleteCreator(id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Créateur non trouvé pour suppression' });
    }

    res.status(200).json({ message: 'Créateur supprimé' });
  } catch (err) {
    console.error('[ERROR] deleteCreatorById:', err.message);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du créateur' });
  }
};