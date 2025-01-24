import type { Request, Response } from 'express';
import { UserRepository } from './user.repository';
import { BaseController, BaseResponse } from '@express-typesafe/core';
import { UserModel } from './user.model';

export class UserController extends BaseController {
  constructor(public userRepository: UserRepository) {
    super();
  }

  async getAll(
    req: Request,
    res: Response
  ): Promise<BaseResponse<UserModel[]>> {
    const users = await this.userRepository.getAll();

    return {
      data: users,
    };
  }

  async get(req: Request, res: Response): Promise<BaseResponse<UserModel>> {
    const user = await this.userRepository.get(req.params.id);

    return {
      data: user,
    };
  }

  async create(req: Request, res: Response): Promise<BaseResponse> {
    await this.userRepository.create(req.body);

    return {
      message: 'User created successfully',
    };
  }

  async update(req: Request, res: Response): Promise<BaseResponse> {
    await this.userRepository.update({
      ...req.body,
      id: req.params.id,
    });

    return {
      message: 'User updated successfully',
    };
  }

  async delete(req: Request, res: Response): Promise<BaseResponse> {
    await this.userRepository.delete(req.params.id);

    return {
      message: 'User deleted successfully',
    };
  }
}
