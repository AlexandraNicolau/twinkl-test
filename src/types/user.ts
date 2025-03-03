export type BaseUser = {
  firstName: string;
  lastName: string;
  password: string;
  emailAddress: string;
  createdAt: string;
  userType: UserType;
};

export type User = BaseUser & {
  id: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;

export enum UserType {
  student = 'student',
  privateTutor = 'privateTutor',
  parent = 'parent',
  teacher = 'teacher',
}
