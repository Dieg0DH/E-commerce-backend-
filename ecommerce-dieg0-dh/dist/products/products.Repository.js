"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
let ProductsRepository = class ProductsRepository {
    products = [
        {
            id: 1,
            name: 'Smartphone XYZ',
            description: 'Latest model with high-resolution camera and fast processor',
            price: 799.99,
            stock: true,
            imgUrl: 'https://example.com/images/smartphone-xyz.jpg',
        },
        {
            id: 2,
            name: 'Laptop Pro',
            description: 'Powerful laptop for professionals with 16GB RAM and SSD',
            price: 1299.99,
            stock: true,
            imgUrl: 'https://example.com/images/laptop-pro.jpg',
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            description: 'Noise-cancelling headphones with 20-hour battery life',
            price: 199.99,
            stock: true,
            imgUrl: 'https://example.com/images/wireless-headphones.jpg',
        },
        {
            id: 4,
            name: 'Smart Watch',
            description: 'Fitness tracker with heart rate monitor and GPS',
            price: 249.99,
            stock: false,
            imgUrl: 'https://example.com/images/smart-watch.jpg',
        },
        {
            id: 5,
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with waterproof design and deep bass',
            price: 89.99,
            stock: true,
            imgUrl: 'https://example.com/images/bluetooth-speaker.jpg',
        },
        {
            id: 6,
            name: 'Tablet Mini',
            description: '8-inch tablet perfect for reading and browsing',
            price: 349.99,
            stock: false,
            imgUrl: 'https://example.com/images/tablet-mini.jpg',
        },
    ];
    find() {
        return this.products;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)()
], ProductsRepository);
//# sourceMappingURL=products.Repository.js.map