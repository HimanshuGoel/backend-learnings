import 'jest';

import { Environment } from './environment';
import { Environments } from './environment.constant';

describe('Environment', () => {
  let instance: Environment;

  beforeEach(() => {
    instance = new Environment('local');
  });

  xit('should get the current environment', async () => {
    expect(instance).toBeInstanceOf(Environment);
    const environment = instance.getCurrentEnvironment();
    expect(environment).toBeDefined();
    expect(environment).toBe(Environments.LOCAL);
  });

  it('should check if environment is production or not', async () => {
    const result = instance.isProductionEnvironment();
    expect(result).toBe(false);
  });

  xit('should set the current environment', async () => {
    instance.setEnvironment(Environments.LOCAL);
    const environment = instance.getCurrentEnvironment();
    expect(environment).toBeDefined();
    expect(environment).toBe(Environments.LOCAL);
  });
});
