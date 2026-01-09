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

router.get('/', findAllCreators);
router.get('/:id', findCreatorById);
router.get('/characters/:id', getCreatorsByCharacter);

router.post('/', createNewCreator);
router.put('/:id', updateCreatorById);
router.delete('/:id', deleteCreatorById);

export default router;
