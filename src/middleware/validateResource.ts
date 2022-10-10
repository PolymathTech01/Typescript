import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
const validate = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
      // headers: req.headers,
    });
    next();
  } catch (error) {
    return res.status(400).send(error);
    // read on type predicate types
  }
};
export default validate;
