import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(): Promise<string>;
    getProducts(page: number, limit: number): Promise<import("./entities/product.entity").Products[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Products | null>;
    createProduct(createProductDto: CreateProductDto): {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
        id: string;
    };
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
