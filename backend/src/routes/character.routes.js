import express from 'express';
import {
  findAllCharacters,
  findCharacterById,
  getCharacterDetails,
  createNewCharacter,
  updateCharacterById,
  deleteCharacterById
} from '../controllers/character.controller.js';

const router = express.Router();

// Routes GET spécifiques d'abord
router.get('/:id/details', getCharacterDetails);
router.get('/:id', findCharacterById);
router.get('/', findAllCharacters);

// ✅ CRUD
router.post('/', createNewCharacter);
router.put('/:id', updateCharacterById);
router.delete('/:id', deleteCharacterById);

export default router;