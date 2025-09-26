import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly categoriesRepository;
    constructor(productsRepository: Repository<Products>, categoriesRepository: Repository<Categories>);
    getProducts(page: number, limit: number): Promise<Products[]>;
    create(): Promise<string>;
    findAll(): Promise<Products[]>;
    findOne(id: string): Promise<Products | null>;
    updateProduct(id: string, product: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
