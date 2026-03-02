import * as characterModel from '../models/character.model.js';
import * as powerModel from '../models/power.model.js';
import * as creatorModel from '../models/creator.model.js';
import * as appearanceModel from '../models/appearance.model.js';

// 🔹 Liste de tous les personnages
export const findAllCharacters = async (req, res) => {
  try {
    const characters = await characterModel.getAllCharacters();
    res.status(200).json(characters);
  } catch (error) {
    console.error('[ERROR] findAllCharacters:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des personnages' });
  }
};

// 🔹 Détails d’un personnage par ID
export const findCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const character = await characterModel.getCharacterById(id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    res.status(200).json(character);
  } catch (error) {
    console.error('[ERROR] findCharacterById:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du personnage' });
  }
};

// 🔹 Endpoint complet "details" (personnage + pouvoirs + créateurs + apparitions)
export const getCharacterDetails = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const character = await characterModel.getCharacterById(id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    // Récupération simultanée pour performance
    const [powers, creators, appearances] = await Promise.all([
      powerModel.getPowersByCharacterId(id),
      creatorModel.getCreatorsByCharacterId(id),
      appearanceModel.getAppearancesByCharacterId(id)
    ]);

    res.status(200).json({ ...character, powers, creators, appearances });
  } catch (error) {
    console.error('[ERROR] getCharacterDetails:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des détails du personnage' });
  }
};

// 🔹 CREATE
export const createNewCharacter = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour créer le personnage' });
    }

    const id = await characterModel.createCharacter(data);
    res.status(201).json({ message: 'Personnage créé', id });
  } catch (error) {
    console.error('[ERROR] createNewCharacter:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la création du personnage' });
  }
};

// 🔹 UPDATE
export const updateCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const character = await characterModel.getCharacterById(id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Données manquantes pour mettre à jour le personnage' });
    }

    const updated = await characterModel.updateCharacter(id, data);
    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: 'Personnage non trouvé pour mise à jour' });
    }

    res.status(200).json({ message: 'Personnage mis à jour' });
  } catch (error) {
    console.error('[ERROR] updateCharacterById:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du personnage' });
  }
};

// 🔹 DELETE
export const deleteCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

    const character = await characterModel.getCharacterById(id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    const deleted = await characterModel.deleteCharacter(id);
    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: 'Personnage non trouvé pour suppression' });
    }

    res.status(200).json({ message: 'Personnage supprimé' });
  } catch (error) {
    console.error('[ERROR] deleteCharacterById:', error.message);
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du personnage' });
  }
};