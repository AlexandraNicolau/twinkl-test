import { Request, Response } from 'express';
import { addUser, findUserById } from '../services/user.service';
import { BaseUser, User, UserType } from '../user/user';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

let userValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(64, 'Password is too long - should be maximum 64 chars')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minLowercase(1, 'Password must contain at least 1 lower case letter')
    .minUppercase(1, 'Password must contain at least 1 upper case letter'),
  emailAddress: yup.string().required('An email address is required'),
  createdAt: yup.string().required('A create date is required'),
  userType: yup.mixed<UserType>().oneOf(Object.values(UserType)),
});

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: User = await findUserById(id);

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
    }
  }
};
