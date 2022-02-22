import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProducts(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product,
    });
  }
  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Products List',
      products,
    });
  }
  @Get('/:productID')
  async GetProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exists');
    return res.status(HttpStatus.OK).json(product);
  }
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      productDeleted,
    });
  }
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully',
      updatedProduct,
    });
  }
}
