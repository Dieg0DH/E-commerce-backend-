import { Products } from 'src/products/entities/product.entity';
import { Orders } from './order.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    product: Products[];
    order: Orders;
}
