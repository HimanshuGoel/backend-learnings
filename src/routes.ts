import express from 'express';

import { StatusRoute } from './routes/status.route';

export function registerRoutes(app: express.Application): void {
  new StatusRoute(app);
}
