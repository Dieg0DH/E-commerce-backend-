import { UpdateOrderDto } from './dto/update-order.dto';
import { Users } from 'src/users/enities/users.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from './entities/order.Details.entity';
import { Products } from 'src/products/entities/product.entity';
export declare class OrdersService {
    private readonly usersRepository;
    private readonly ordersRepository;
    private readonly ProductsRepository;
    private readonly orderDetailsRepository;
    constructor(usersRepository: Repository<Users>, ordersRepository: Repository<Orders>, ProductsRepository: Repository<Products>, orderDetailsRepository: Repository<OrderDetails>);
    create(userId: string, productsId: string[]): Promise<Orders | null>;
    findOne(id: string): Promise<Orders>;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
}
