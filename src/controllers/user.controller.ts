import express, { Express, Request, Response } from 'express';
import { findUserById } from '../services/user.service';
import { User } from '../user/user';

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: User = await findUserById(id);

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
};

export const createUser = (req: Request, res: Response) => {
  res.send('Hello World!');
};
