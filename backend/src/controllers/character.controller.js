import * as characterModel from '../models/character.model.js';
import * as powerModel from '../models/power.model.js';
import * as creatorModel from '../models/creator.model.js';
import * as appearanceModel from '../models/appearance.model.js';

// Liste de tous les personnages
export const findAllCharacters = async (req, res) => {
  try {
    const characters = await characterModel.getAllCharacters();
    res.status(200).json(characters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Détails d’un personnage par ID
export const findCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const character = await characterModel.getCharacterById(id);
    if (!character) {
      return res.status(404).json({ message: 'Personnage non trouvé' });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Endpoint complet "details"
export const getCharacterDetails = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const character = await characterModel.getCharacterById(id);
    if (!character) {
      return res.status(404).json({ message: 'Personnage non trouvé' });
    }

    // Exécution parallèle (optimisé)
    const [powers, creators, appearances] = await Promise.all([
      powerModel.getPowersByCharacterId(id),
      creatorModel.getCreatorsByCharacterId(id),
      appearanceModel.getAppearancesByCharacterId(id)
    ]);

    res.status(200).json({
      character,
      powers,
      creators,
      appearances
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// CREATE
export const createNewCharacter = async (req, res) => {
  try {
    const id = await characterModel.createCharacter(req.body);
    res.status(201).json({ message: 'Personnage créé', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// UPDATE
export const updateCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const character = await characterModel.getCharacterById(id);
    if (!character) {
      return res.status(404).json({ message: 'Personnage non trouvé' });
    }

    await characterModel.updateCharacter(id, req.body);

    res.status(200).json({ message: 'Personnage mis à jour' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE
export const deleteCharacterById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const character = await characterModel.getCharacterById(id);
    if (!character) {
      return res.status(404).json({ message: 'Personnage non trouvé' });
    }

    await characterModel.deleteCharacter(id);

    res.status(200).json({ message: 'Personnage supprimé' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};