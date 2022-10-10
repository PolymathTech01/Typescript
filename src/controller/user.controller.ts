import { omit } from 'lodash';
import { createUserInput } from './../schema/user.schema';
import { createUser } from './../service/user.service';
import { Request, Response } from 'express';
import logger from '../utils/logger';

export const createUserHandler = async (
  req: Request<{}, {}, createUserInput['body']>,
  res: Response
) => {
  try {
    const user: Array<object> = (await createUser(req.body)) as Array<object>;
    console.log('omit', omit(user[0], ['password', 'email']));
    console.log('keys', user[0]['_doc']);
    return res.status(200).send(omit(user[0], ['password', 'email']));
  } catch (error) {
    logger.error(error);
    res.status(409).send({ error });
  }
};
