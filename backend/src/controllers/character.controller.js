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
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Détails d’un personnage par ID
export const findCharacterById = async (req, res) => {
  try {
    const character = await characterModel.getCharacterById(req.params.id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });
    res.status(200).json(character);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Endpoint complet "details" (personnage + pouvoirs + créateurs + apparitions)
export const getCharacterDetails = async (req, res) => {
  try {
    const characterId = req.params.id;
    const character = await characterModel.getCharacterById(characterId);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    const powers = await powerModel.getPowersByCharacterId(characterId);
    const creators = await creatorModel.getCreatorsByCharacterId(characterId);
    const appearances = await appearanceModel.getAppearancesByCharacterId(characterId);

    res.status(200).json({ ...character, powers, creators, appearances });
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
    const character = await characterModel.getCharacterById(req.params.id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    await characterModel.updateCharacter(req.params.id, req.body);
    res.status(200).json({ message: 'Personnage mis à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE
export const deleteCharacterById = async (req, res) => {
  try {
    const character = await characterModel.getCharacterById(req.params.id);
    if (!character) return res.status(404).json({ message: 'Personnage non trouvé' });

    await characterModel.deleteCharacter(req.params.id);
    res.status(200).json({ message: 'Personnage supprimé' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
