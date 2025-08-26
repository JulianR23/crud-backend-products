import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // Conexión a MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/products'),

    // Importas tu módulo de productos
    ProductsModule,
  ],
})
export class AppModule {}
