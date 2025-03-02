import * as yup from 'yup';
import YupPassword from 'yup-password';
import { UserType } from '../user/user';
YupPassword(yup);

export const userValidationSchema = yup.object().shape({
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
