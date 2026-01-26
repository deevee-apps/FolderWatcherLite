import { Router } from 'express';
import { start, stop, events } from '../controllers/watch.controller';

export const router = Router();

router.post('/start', start);
router.post('/stop', stop);
router.get('/events', events);