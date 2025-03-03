import * as yup from 'yup';
import { Request, Response } from 'express';
import { addUser, findUserById } from '../services/user.service';
import { BaseUser, User } from '../types/user';
import { userValidationSchema } from './user.validation';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await findUserById(id);

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: BaseUser = req.body;

    await userValidationSchema.validate(user, { abortEarly: false });

    const newUser = await addUser(user);

    res.status(201).json(newUser);
  } catch (e) {
    if (e instanceof yup.ValidationError) {
      res.status(400).json({ error: e.errors });
    } else if (e instanceof Error) {
      res.status(500).json({ error: (e as Error).message });
    } else {
      res.status(500).json({ error: 'An unknown error has occurred' });
    }
  }
};
