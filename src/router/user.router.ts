import express from 'express';
import { createUser, getUserById } from '../controllers/user.controller';

export const userRouter = express.Router();

userRouter.get('/:id', getUserById);

userRouter.post('/signup', createUser);
