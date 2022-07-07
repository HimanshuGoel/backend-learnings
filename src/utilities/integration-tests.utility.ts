import * as express from 'express';
import { App } from '../app';

import { Environment } from '../environments/environment';
import { Environments } from '../environments/environment.constant';
import { setGlobalEnvironment } from '../global';
import { logger } from './logger.utility';

export default class IntegrationTestsUtility {
  public static appInstance: express.Application;

  public static async getApp(): Promise<express.Application> {
    if (this.appInstance) {
      return this.appInstance;
    }

    const env: Environment = new Environment(Environments.TEST);
    setGlobalEnvironment(env);

    const app: App = new App();
    this.appInstance = app.express;
    return this.appInstance;
  }

  public clearDatabase(): void {
    logger.info('clear the database');
  }
}
