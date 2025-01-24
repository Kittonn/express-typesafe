import type { Request, Response } from 'express';
import { UserRepository } from './user.repository';
import { BaseController } from '@express-typesafe/core';

export class UserController extends BaseController {
  constructor(public userRepository: UserRepository) {
    super();
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userRepository.getAll();

    return res.json({
      data: users,
    });
  }

  async get(req: Request, res: Response) {
    const user = await this.userRepository.get(req.params.id);

    return res.json({
      data: user,
    });
  }

  async create(req: Request, res: Response) {
    const createdUser = await this.userRepository.create(req.body);

    return res.json({
      data: createdUser,
    });
  }

  async update(req: Request, res: Response) {
    const updatedUser = await this.userRepository.update({
      ...req.body,
      id: req.params.id,
    });

    return res.json({
      data: updatedUser,
    });
  }

  async delete(req: Request, res: Response) {
    const deletedUser = await this.userRepository.delete(req.params.id);

    return res.json({
      data: deletedUser,
    });
  }
}
