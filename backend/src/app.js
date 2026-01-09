import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/character.routes.js';
import powerRoutes from './routes/power.routes.js';
import creatorRoutes from './routes/creator.routes.js';
import appearanceRoutes from './routes/appearance.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/characters', characterRoutes);
app.use('/api/powers', powerRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/appearances', appearanceRoutes);

export default app;
