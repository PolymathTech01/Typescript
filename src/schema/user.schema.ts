import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'password too short should be at least 6 characters long'
    ),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }).min(
      6,
      'passwordConfirmation too short should be at least 6 characters long'
    ),
    email: string({ required_error: 'Email is required' }).email(
      'Not a valid email address'
    ),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
