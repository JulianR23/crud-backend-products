import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { CreateProductsDto } from './dto/create-product.dto';
import { UpdateProductsDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductsDto): Promise<Product> {
    try{
      const created = new this.productModel(createProductDto);
      return await created.save();
    }catch(error){
      throw new Error('Error creating product: ' + error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    try{
      const products = await this.productModel.find().exec();
      if(products.length === 0) throw new Error('No products found');
      return products;
    }catch(error){
      throw new NotFoundException('Error finding products: ' + error.message);
    }
  }

  async findOne(id: Types.ObjectId): Promise<Product | null> {
    try{
      return await this.productModel.findById(id).exec();
    }catch(error){
      throw new Error('Error finding product: ' + error.message);
    }
  }

async update(id: Types.ObjectId, updateProductDto: UpdateProductsDto): Promise<Product | null> {
  try {
    const updatedProduct = await this.productModel.findById(id).exec();
    if (!updatedProduct) throw new Error('Product not found');

    if (updateProductDto.title?.trim()) {
      updatedProduct.title = updateProductDto.title;
    }
    if (updateProductDto.description?.trim()) {
      updatedProduct.description = updateProductDto.description;
    }
    if (typeof updateProductDto.price === 'number' && updateProductDto.price >= 0) {
      updatedProduct.price = updateProductDto.price;
    }

    return await updatedProduct.save();
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
}

  async remove(id: Types.ObjectId): Promise<Product | null> {
    try{
      const Product = await this.productModel.findById(id).exec();
      if (!Product) throw new Error('Product not found');

      return await this.productModel.findByIdAndDelete(id).exec();
    }catch(error){
      throw new Error('Error deleting product: ' + error.message);
    }

  }
}
