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

// Routes GET spécifiques en premier
router.get('/characters/:id', getPowersByCharacter);
router.get('/:id', findPowerById);
router.get('/', findAllPowers);

// ✅ CRUD
router.post('/', createNewPower);
router.put('/:id', updatePowerById);
router.delete('/:id', deletePowerById);

export default router;