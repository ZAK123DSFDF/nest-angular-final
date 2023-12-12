import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';

export const storage = {
  storage: diskStorage({
    destination: './public',
    filename: (req, file, cb) => {
      try {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      } catch (error) {
        cb(
          new HttpException(
            'Failed to generate filename',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
          null,
        );
      }
    },
  }),
};
