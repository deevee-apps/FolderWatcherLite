import { Request, Response } from 'express';
import { watcherService } from '../services/watcher.service';

export const start = (req: Request, res: Response) => {
  const { path } = req.body as { path: string };
  if (!path) return res.status(400).json({ error: 'path is required' });
  watcherService.start(path);
  res.status(200).json({ status: 'watching' });
};

export const stop = (_req: Request, res: Response) => {
  watcherService.stop();
  res.status(200).json({ status: 'stopped' });
};

export const events = (_req: Request, res: Response) => {
  res.json(watcherService.getEvents());
};