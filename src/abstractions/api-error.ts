import { IError } from '../interfaces/error.interface';

export class ApiError extends Error implements IError {
  public status = 500;

  public success = false;

  public fields!: { name: { message: string } };

  constructor(msg: string, statusCode: number, name = 'ApiError') {
    super();
    this.name = name;
    this.message = msg;
    this.status = statusCode;
  }
}
