"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const data = require("../data.json");
const product_entity_1 = require("./entities/product.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
let ProductsService = class ProductsService {
    productsRepository;
    categoriesRepository;
    constructor(productsRepository, categoriesRepository) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async getProducts(page, limit) {
        let products = await this.productsRepository.find();
        const start = (page - 1) * limit;
        const end = start + +limit;
        products = products.slice(start, end);
        return products;
    }
    async create() {
        const categories = await this.categoriesRepository.find();
        const products = data.map((element) => {
            const category = categories.find((category) => element.category === category.name);
            const newProduct = new product_entity_1.Products();
            newProduct.name = element.name;
            newProduct.description = element.description;
            newProduct.price = element.price;
            newProduct.stock = element.stock;
            newProduct.category = category;
            return newProduct;
        });
        await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(product_entity_1.Products)
            .values(products)
            .orIgnore()
            .execute();
        return 'Products Added';
    }
    findAll() {
        return this.productsRepository.find();
    }
    findOne(id) {
        return this.productsRepository.findOne({ where: { id } });
    }
    updateProduct(id, product) {
        return this.productsRepository.update(id, product);
    }
    async remove(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productsRepository.remove(product);
        return { message: `Product with ID ${id} has been deleted` };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Products)),
    __param(1, (0, typeorm_2.InjectRepository)(category_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map