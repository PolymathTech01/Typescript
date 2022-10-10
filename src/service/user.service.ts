import UserModel, { UserDocument } from './../models/user.model';
import { DocumentDefinition } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
export const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) => {
  try {
    const salt = bcrypt.genSaltSync(config.get<number>('saltWalkFactor'));
    const hash = bcrypt.hashSync(input.password, salt);
    input.password = hash.toString();
    console.info('hash', hash);
    return await UserModel.insertMany(input);
  } catch (error) {
    // console.error(error);
    return error;
  }
};
// createdAt and updatedAt were both ommited because mongodb will create it automatically for us when we create and update our documents
