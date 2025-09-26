import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/enities/users.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/order.Details.entity';
import { Products } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly ProductsRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async create(userId: string, productsId: string[]) {
    const user: Users | null = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder: Orders = await this.ordersRepository.save(order);

    let total = 0;

    const productsArray: Products[] = await Promise.all(
      productsId.map(async (productId) => {
        const product: Products | null =
          await this.ProductsRepository.findOneBy({
            id: productId,
          });

        if (!product) {
          throw new NotFoundException('Product not found');
        }

        total += Number(product.price);

        await this.ProductsRepository.update(
          { id: productId },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.order = newOrder;
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.product = productsArray;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.findOne({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async findOne(id: string) {
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
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
