import express from 'express';
import {
  findAllPowers,
  findPowerById,
  getPowersByCharacter,
  createNewPower,
  updatePowerById,
  deletePowerById
} from '../controllers/power.controller.js';

const router = express.Router();

router.get('/', findAllPowers);
router.get('/:id', findPowerById);
router.get('/characters/:id', getPowersByCharacter);

router.post('/', createNewPower);
router.put('/:id', updatePowerById);
router.delete('/:id', deletePowerById);

export default router;
