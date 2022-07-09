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

export class App {
  public express!: express.Application;

  constructor() {
    this.express = express();
    this.setEnvironmentVariables();
    this.setDatabase();
    this.setMiddlewares();
    this.setRoutes();
    this.addErrorHandler();
  }

  private addErrorHandler(): void {
    this.express.use(addErrorHandler);
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
    this.express.use(cors());
    this.express.use(morgan('tiny'));
    this.express.use(setRequestHeaders);
    this.express.use(bodyParser.json());
    this.express.use(express.json({ limit: '300kb' }));
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private setRoutes(): void {
    this.express.get('/', this.basePathRoute);
    registerRoutes(this.express);
  }

  private basePathRoute(request: express.Request, response: express.Response): void {
    const basePath = 'base path';
    response.json({ api: identifierConstants.appName, message: basePath });
  }
}

