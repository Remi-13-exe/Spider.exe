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

router.get('/', findAllCharacters);
router.get('/:id', findCharacterById);
router.get('/:id/details', getCharacterDetails);

// ✅ CRUD
router.post('/', createNewCharacter);
router.put('/:id', updateCharacterById);
router.delete('/:id', deleteCharacterById);

export default router;
