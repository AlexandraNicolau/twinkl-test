export type BaseUser = {
    firstName: string,
    lastName: string,
    passowrd: string,
    emailAddress: string,
    createdAt: string,
    userType: UserType
}

export type User = BaseUser & {
    id: string
}

export enum UserType {
    student = "student",
    privateTutor = 'privateTutor',
    parent = 'parent',
    teacher = 'teacher'
}