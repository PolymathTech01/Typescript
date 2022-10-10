import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import logger from '../utils/logger';

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(inputPassword: string): Promise<Boolean>;
}
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', (next) => {
  let user = (this as unknown) as UserDocument;
  console.log('user modified password', !user.isModified('password'));
  console.log('user............', user);
  if (!user.isModified('password')) {
    logger.info('i am here......');
    return next();
  }
  const salt = bcrypt.genSaltSync(config.get<number>('saltWalkFactor'));
  const hash = bcrypt.hashSync(user.password, salt);
  logger.info('hash', hash);
  user.password = hash;
  console.log('password ', user.password);
  return next();
});

userSchema.methods.comparePassword = async (
  inputPassword: string
): Promise<boolean> => {
  let user = (this as unknown) as UserDocument;
  return bcrypt.compare(inputPassword, user.password).catch((err) => false);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
