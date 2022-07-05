import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { identifierConstants } from './constant/identifier.constants';
import { Environment } from './environments/environment';
import { setGlobalEnvironment } from './global';
import { addErrorHandler } from './middlewares/error-handler';
import { setRequestHeaders } from './middlewares/request-headers';
import { registerRoutes } from './routes';

const env: Environment = new Environment();
setGlobalEnvironment(env);

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setEnvironmentVariables();
    this.setDatabase();
    this.setMiddlewares();
    this.setRoutes();
    this.addErrorHandler();
  }

  private addErrorHandler(): void {
    this.app.use(addErrorHandler);
  }

  private setDatabase(): void {
    mongoose.connect('mongodb://localhost:27017/backendLearningsDB');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection:error:'));
    db.once('open', function () {
      console.log('Connected to MongoDB');
    });
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
