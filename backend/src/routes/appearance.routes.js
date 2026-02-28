import express from 'express';
import {
  findAllAppearances,
  findAppearanceById,
  getAppearancesByCharacter,
  createNewAppearance,
  updateAppearanceById,
  deleteAppearanceById
} from '../controllers/appearance.controller.js';

const router = express.Router();

// Routes spécifiques en premier
router.get('/characters/:id', getAppearancesByCharacter);
router.get('/', findAllAppearances);
router.get('/:id', findAppearanceById);

router.post('/', createNewAppearance);
router.put('/:id', updateAppearanceById);
router.delete('/:id', deleteAppearanceById);

export default router;