import 'jest';

import express from 'express';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import IntegrationTestsUtility from '../utilities/integration-tests.utility';

describe('status integration tests', () => {
  let app: express.Application;

  beforeAll(async () => {
    app = await IntegrationTestsUtility.getApp();
  });

  it('can get server time', async () => {
    await request(app)
      .get('/api/status/time')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res: request.Response) => {
        console.log(res.text);
      })
      .expect(StatusCodes.OK);
  });

  it('can get server system info', async () => {
    await request(app)
      .get('/api/status/system')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(StatusCodes.OK);
  });

  it('can get server system usage', async () => {
    await request(app)
      .get('/api/status/usage')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(StatusCodes.OK);
  });

  it('can get server system process info', async () => {
    await request(app)
      .get('/api/status/process')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(StatusCodes.OK);
  });

  it('should get the error', async () => {
    await request(app)
      .get('/api/status/error')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(StatusCodes.BAD_REQUEST);
  });
});
