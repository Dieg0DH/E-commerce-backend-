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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/enities/users.entity");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_Details_entity_1 = require("./entities/order.Details.entity");
const product_entity_1 = require("../products/entities/product.entity");
let OrdersService = class OrdersService {
    usersRepository;
    ordersRepository;
    ProductsRepository;
    orderDetailsRepository;
    constructor(usersRepository, ordersRepository, ProductsRepository, orderDetailsRepository) {
        this.usersRepository = usersRepository;
        this.ordersRepository = ordersRepository;
        this.ProductsRepository = ProductsRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    async create(userId, productsId) {
        const user = await this.usersRepository.findOneBy({
            id: userId,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const order = new order_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.ordersRepository.save(order);
        let total = 0;
        const productsArray = await Promise.all(productsId.map(async (productId) => {
            const product = await this.ProductsRepository.findOneBy({
                id: productId,
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            total += Number(product.price);
            await this.ProductsRepository.update({ id: productId }, { stock: product.stock - 1 });
            return product;
        }));
        const orderDetail = new order_Details_entity_1.OrderDetails();
        orderDetail.order = newOrder;
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.product = productsArray;
        await this.orderDetailsRepository.save(orderDetail);
        return await this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: { orderDetails: true },
        });
    }
    async findOne(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: {
                user: true,
                orderDetails: {
                    product: true,
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Orders)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Products)),
    __param(3, (0, typeorm_1.InjectRepository)(order_Details_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map