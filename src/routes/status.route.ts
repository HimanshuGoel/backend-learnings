import os from 'os';
import process from 'process';
import { Application, NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { version } from '../../package.json';
import { ApiError } from '../abstractions/api-error';
import { sendResponse } from '../abstractions/response-handler';
import { BaseApiRoute } from './base-api.route';

export class StatusRoute extends BaseApiRoute {
  constructor(express: Application) {
    super();
    this.register(express);
  }

  public register(app: Application): void {
    app.use('/api/status', this.router);

    this.router
      .get('/health', this.getServerHealth)
      .get('/system', this.getSystemInfo)
      .get('/time', this.getServerTime)
      .get('/usage', this.getResourceUsage)
      .get('/process', this.getProcessInfo)
      .get('/error', this.getError)
      .get('/env', this.getEnv);
  }

  private getEnv(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        env: process.env
      };
      sendResponse(res, data, StatusCodes.OK, ReasonPhrases.OK);
    } catch (error) {
      next(error);
    }
  }

  private getServerHealth(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).send({
        status: ReasonPhrases.OK,
        version
      });
    } catch (error) {
      next(error);
    }
  }

  private getSystemInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const response = {
        cpus: os.cpus(),
        network: os.networkInterfaces(),
        os: {
          platform: process.platform,
          version: os.release(),
          totalMemory: os.totalmem(),
          uptime: os.uptime()
        },
        currentUser: os.userInfo()
      };

      res.status(StatusCodes.OK).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  private getServerTime(req: Request, res: Response, next: NextFunction) {
    try {
      const now: Date = new Date();
      const utc: Date = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      const time = {
        utc,
        date: now
      };
      res.status(StatusCodes.OK).send({
        data: time
      });
    } catch (error) {
      next(error);
    }
  }

  private getResourceUsage(req: Request, res: Response, next: NextFunction) {
    try {
      const totalMem: number = os.totalmem();
      const memProc: NodeJS.MemoryUsage = process.memoryUsage();
      const freeMem: number = os.freemem();

      const response = {
        processMemory: memProc,
        systemMemory: {
          free: freeMem,
          total: totalMem,
          percentFree: Math.round((freeMem / totalMem) * 100)
        },
        processCpu: process.cpuUsage(),
        systemCpu: os.cpus()
      };

      res.status(StatusCodes.OK).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  private getProcessInfo(req: Request, res: Response, next: NextFunction): void {
    try {
      const response = {
        procCpu: process.cpuUsage(),
        memUsage: process.memoryUsage(),
        env: process.env,
        pid: process.pid,
        uptime: process.uptime(),
        applicationVersion: process.version,
        nodeDependencyVersions: process.versions
      };
      res.status(StatusCodes.OK).send({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  private getError(req: Request, res: Response, next: NextFunction): void {
    try {
      throw new ApiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST);
    } catch (error) {
      next(error);
    }
  }
}
