import { OrderDetails } from './order.Details.entity';
import { Users } from 'src/users/enities/users.entity';
export declare class Orders {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: Users;
}
