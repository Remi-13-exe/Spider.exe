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

router.get('/', findAllAppearances);
router.get('/:id', findAppearanceById);
router.get('/characters/:id', getAppearancesByCharacter);

router.post('/', createNewAppearance);
router.put('/:id', updateAppearanceById);
router.delete('/:id', deleteAppearanceById);

export default router;
