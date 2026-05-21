import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { uploadDir } from '../config/uploads.js';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE_MB = 5;

mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  },
});

function imageFileFilter(req, file, cb) {
  if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new Error(`Only image files are allowed (jpeg, png, webp, gif). Got: ${file.mimetype}`);
    err.code = 'INVALID_FILE_TYPE';
    cb(err, false);
  }
}

export const uploadImage = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
});
