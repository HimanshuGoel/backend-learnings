import express from 'express';

import { StatusRoute } from './routes/status.route';
import { UsersRoute } from './routes/users.route';

export function registerRoutes(app: express.Application): void {
  new StatusRoute(app);
  new UsersRoute(app);
}
