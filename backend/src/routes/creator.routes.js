import express from 'express';
import {
  findAllCreators,
  findCreatorById,
  getCreatorsByCharacter,
  createNewCreator,
  updateCreatorById,
  deleteCreatorById
} from '../controllers/creator.controller.js';

const router = express.Router();

// Routes GET spécifiques en premier
router.get('/characters/:id', getCreatorsByCharacter);
router.get('/:id', findCreatorById);
router.get('/', findAllCreators);

// ✅ CRUD
router.post('/', createNewCreator);
router.put('/:id', updateCreatorById);
router.delete('/:id', deleteCreatorById);

export default router;