import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseApiRoute } from './base-api.route';
import { User } from '../models/user.model';

export class UsersRoute extends BaseApiRoute {
  constructor(express: Application) {
    super();
    this.register(express);
  }

  public register(app: Application): void {
    app.use('/api', this.router);

    this.router.get('/users', this.getUsers);
    this.router.post('/user', this.saveUser);
  }

  private getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      User.find({})
        .then((users) => {
          res.status(StatusCodes.OK).send({
            data: users
          });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }

  private saveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = new User({
        name: 'John Doe',
        address: '123 Main St'
      });

      user
        .save()
        .then((user) => {
          res.status(StatusCodes.OK).send({
            data: user
          });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }
}
