import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './app.middleware';

@Controller()
export class UploadController {
  // @Options()
  // handleOptions(): any {
  //   return {
  //     statusCode: 200,
  //     headers: {
  //       'Access-Control-Allow-Headers': 'Content-Type',
  //       'Access-Control-Allow-Methods': 'POST',
  //     },
  //   };
  // }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file) {
    console.log(file);
    try {
      const fileSizeInBytes = file.size;
      const fileSizeInKilobytes = fileSizeInBytes / 1024;
      const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
      return {
        filename: file.filename,
        size: {
          bytes: fileSizeInBytes,
          kilobytes: fileSizeInKilobytes.toFixed(2),
          megabytes: fileSizeInMegabytes.toFixed(2),
        },
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
