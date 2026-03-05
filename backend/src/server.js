import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import characterRoutes from './routes/character.routes.js';
import appearanceRoutes from './routes/appearance.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes test
app.get('/', (req, res) => {
  res.send('API Spider.exe fonctionne ✅');
});

app.use('/api/characters', characterRoutes);
app.use('/api/appearances', appearanceRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});