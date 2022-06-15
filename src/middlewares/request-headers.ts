import { Request, Response, NextFunction } from 'express';

export const setRequestHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-methods', 'GET, POST, PUT, DELETE');
  res.set('access-control-allow-headers', 'authorization, content-type');
  next();
};
