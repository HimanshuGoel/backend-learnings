import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

import { registerRoutes } from './routes';
import { setRequestHeaders } from './middlewares/request-headers';
import { identifierConstants } from './constant/identifier.constants';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setEnvironmentVariables();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setEnvironmentVariables(): void {
    const rootDir: string = path.resolve(__dirname, '../');
    config({ path: path.resolve(rootDir, '.env') });
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan('tiny'));
    this.app.use(setRequestHeaders);
    this.app.use(bodyParser.json());
    this.app.use(express.json({ limit: '300kb' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private setRoutes(): void {
    this.app.get('/', this.basePathRoute);
    registerRoutes(this.app);
  }

  private basePathRoute(request: express.Request, response: express.Response): void {
    const basePath = 'base path';
    response.json({ api: identifierConstants.appName, message: basePath });
  }
}

export default new App().app;
