import express from 'express';
import { param, validationResult } from 'express-validator';
import {
  findAllPowers,
  findPowerById,
  getPowersByCharacter,
  createNewPower,
  updatePowerById,
  deletePowerById
} from '../controllers/power.controller.js';

const router = express.Router();

// Middleware de validation des IDs
const validateId = param('id').isInt({ gt: 0 }).withMessage('ID invalide');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// 🔹 GET /api/powers/characters/:id
router.get('/characters/:id', validateId, handleValidation, getPowersByCharacter);

// 🔹 GET /api/powers/:id
router.get('/:id', validateId, handleValidation, findPowerById);

// 🔹 GET /api/powers
router.get('/', findAllPowers);

// 🔹 POST /api/powers
router.post('/', createNewPower);

// 🔹 PUT /api/powers/:id
router.put('/:id', validateId, handleValidation, updatePowerById);

// 🔹 DELETE /api/powers/:id
router.delete('/:id', validateId, handleValidation, deletePowerById);

export default router;