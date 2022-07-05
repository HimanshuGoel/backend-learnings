import { Response } from 'express';

import { encrypt } from './crypto';
import { logger } from './logger';

export function sendResponse(
  res: Response,
  data: unknown,
  statusCode: number,
  reasonPhrases: string
): void {
  let obj = data;
  if (environment.isProductionEnvironment()) {
    logger.info(JSON.stringify(obj, null, 2));
  }
  if (environment.applyEncryption) {
    obj = encrypt(JSON.stringify(obj), environment.secretKey);
  }
  res.status(statusCode).send({
    status: reasonPhrases,
    data: obj
  });
}
