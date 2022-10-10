import { createUserSchema } from './schema/user.schema';
import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validate from './middleware/validateResource';
const routes = (app: Express) => {
  app.get('/heathcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post('/api/users', validate(createUserSchema), createUserHandler);
};

export default routes;
