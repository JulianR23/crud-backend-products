import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductsDto } from './dto/update-product.dto';
import { Types } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductsDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const objectId: Types.ObjectId = new Types.ObjectId(id);
    return this.productsService.findOne(objectId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductsDto) {
    const objectId: Types.ObjectId = new Types.ObjectId(id);
    return this.productsService.update(objectId, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const objectId: Types.ObjectId = new Types.ObjectId(id);
    return this.productsService.remove(objectId);
  }
}
