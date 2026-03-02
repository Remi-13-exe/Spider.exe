import express from 'express';
import { param, validationResult } from 'express-validator';
import {
  findAllCharacters,
  findCharacterById,
  getCharacterDetails,
  createNewCharacter,
  updateCharacterById,
  deleteCharacterById
} from '../controllers/character.controller.js';

const router = express.Router();

// Middleware de validation des IDs
const validateId = param('id').isInt({ gt: 0 }).withMessage('ID invalide');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// 🔹 GET /api/characters/:id/details
router.get('/:id/details', validateId, handleValidation, getCharacterDetails);

// 🔹 GET /api/characters/:id
router.get('/:id', validateId, handleValidation, findCharacterById);

// 🔹 GET /api/characters
router.get('/', findAllCharacters);

// 🔹 POST /api/characters
router.post('/', createNewCharacter);

// 🔹 PUT /api/characters/:id
router.put('/:id', validateId, handleValidation, updateCharacterById);

// 🔹 DELETE /api/characters/:id
router.delete('/:id', validateId, handleValidation, deleteCharacterById);

export default router;