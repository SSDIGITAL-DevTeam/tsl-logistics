import path from 'path';
import { env } from './env.js';

export const uploadDir = path.isAbsolute(env.UPLOAD_DIR)
  ? env.UPLOAD_DIR
  : path.resolve(process.cwd(), env.UPLOAD_DIR);
