import express from 'express';
import cors from 'cors';
import { router as watchRouter } from './routes/watch.routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/watch', watchRouter);