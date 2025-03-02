import express, { Express, Request, Response } from 'express';

export const getUserById = (req: Request, res: Response) => {
  res.send('Hello World!');
};

export const createUser = (req: Request, res: Response) => {
  res.send('Hello World!');
};
