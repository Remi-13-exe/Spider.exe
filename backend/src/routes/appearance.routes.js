import express from 'express';
import { param, validationResult } from 'express-validator';
import {
  findAllAppearances,
  findAppearanceById,
  getAppearancesByCharacter,
  createNewAppearance,
  updateAppearanceById,
  deleteAppearanceById
} from '../controllers/appearance.controller.js';

const router = express.Router();

// Middleware pour valider les IDs
const validateId = param('id').isInt({ gt: 0 }).withMessage('ID invalide');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// 🔹 GET /api/appearances/characters/:id
router.get('/characters/:id', validateId, handleValidation, getAppearancesByCharacter);

// 🔹 GET /api/appearances
router.get('/', findAllAppearances);

// 🔹 GET /api/appearances/:id
router.get('/:id', validateId, handleValidation, findAppearanceById);

// 🔹 POST /api/appearances
router.post('/', createNewAppearance);

// 🔹 PUT /api/appearances/:id
router.put('/:id', validateId, handleValidation, updateAppearanceById);

// 🔹 DELETE /api/appearances/:id
router.delete('/:id', validateId, handleValidation, deleteAppearanceById);

export default router;