import { Injectable, NotFoundException } from '@nestjs/common';
import * as data from '../data.json';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products: Products[] = await this.productsRepository.find();

    const start = (page - 1) * limit;
    const end = start + +limit;

    products = products.slice(start, end);

    return products;
  }

  async create(): Promise<string> {
    const categories: Categories[] = await this.categoriesRepository.find();

    const products: Products[] = data.map((element) => {
      const category: Categories | undefined = categories.find(
        (category) => element.category === category.name,
      );

      const newProduct = new Products();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.stock = element.stock;
      newProduct.category = category!;

      return newProduct;
    });

    await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(products)
      .orIgnore()
      .execute();
    return 'Products Added';
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  updateProduct(id: string, product: UpdateProductDto) {
    return this.productsRepository.update(id, product);
  }

  async remove(id: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productsRepository.remove(product);
    return { message: `Product with ID ${id} has been deleted` };
  }
}
