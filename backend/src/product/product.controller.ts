import { Controller, Get, Post, Body, Param, Query, Put, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path/win32';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductController {
  constructor(private service: ProductService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateProductDto,
  ) {
    if (file) {
      dto.imageUrl = `/uploads/products/${file.filename}`;
    }

    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('page') page = '1', @Query('limit') limit = '10', @Query('search') search?: string, @Query('category') category?: string) {
    return this.service.findAll(Number(page), Number(limit), search, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.imageUrl = `/uploads/products/${file.filename}`;
    }

    return this.service.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
