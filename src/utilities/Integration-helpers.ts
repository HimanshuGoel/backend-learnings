import * as express from 'express';
import { App } from '../../src/app';

import { Environments } from '../../src/environments/environment.constant';
import { setGlobalEnvironment } from '../../src/global';

import { Environment } from '../environments/environment';


export default class IntegrationHelpers {
  public static appInstance: express.Application;

  public static async getApp(): Promise<express.Application> {
    if (this.appInstance) {
      return this.appInstance;
    }
    const env: Environment = new Environment(Environments.TEST);
    setGlobalEnvironment(env);
    const app: App = new App();
    // app();
    this.appInstance = app.express;
    // console.log(app.app)
    this.appInstance = app.express;
    return this.appInstance;
  }

  public clearDatabase(): void {
    // logger.info('clear the database');
    console.log('clear the database');
  }
}
