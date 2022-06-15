import express from 'express';

import { HealthRoute } from './routes/health.route';

export default function registerRoutes(app: express.Application): void {
  new HealthRoute(app);
}
