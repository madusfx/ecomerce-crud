import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/products-nest', {
      useNewUrlParser: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
