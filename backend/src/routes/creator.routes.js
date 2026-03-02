import express from 'express';
import { param, validationResult } from 'express-validator';
import {
  findAllCreators,
  findCreatorById,
  getCreatorsByCharacter,
  createNewCreator,
  updateCreatorById,
  deleteCreatorById
} from '../controllers/creator.controller.js';

const router = express.Router();

// Middleware de validation des IDs
const validateId = param('id').isInt({ gt: 0 }).withMessage('ID invalide');

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// 🔹 GET /api/creators/characters/:id
router.get('/characters/:id', validateId, handleValidation, getCreatorsByCharacter);

// 🔹 GET /api/creators/:id
router.get('/:id', validateId, handleValidation, findCreatorById);

// 🔹 GET /api/creators
router.get('/', findAllCreators);

// 🔹 POST /api/creators
router.post('/', createNewCreator);

// 🔹 PUT /api/creators/:id
router.put('/:id', validateId, handleValidation, updateCreatorById);

// 🔹 DELETE /api/creators/:id
router.delete('/:id', validateId, handleValidation, deleteCreatorById);

export default router;