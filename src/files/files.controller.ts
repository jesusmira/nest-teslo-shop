import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers/index';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ok } from 'assert';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configSeervice: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ){

    const path = this.filesService.getStaticProductImage(imageName);

      res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    // limits: {
    //   fileSize: 1024 * 1024 * 10,
    // },
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer,
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ){
    if (!file) {
      throw new BadRequestException('Make sure that the file ia an image'); 
    }

    // const secureUrl = `${file.filename}`;
    const secureUrl = `${this.configSeervice.get('HOST_API')}/files/product/${file.filename}`;
    
    return {
      secureUrl
    }
  }
}
