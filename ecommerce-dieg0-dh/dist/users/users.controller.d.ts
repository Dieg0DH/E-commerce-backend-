import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page: number, limit: number): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/entities/order.entity").Orders[];
    }[]>;
    ordersByIdDate(userid: string): Promise<{
        orders: {
            id: string;
            date: Date;
        }[];
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/entities/order.entity").Orders[];
    }>;
    deleteUser(id: string): Promise<{
        message: string;
        id: string;
        name: string;
        email: string;
        phone: number;
        country: string;
        address: string;
        city: string;
        isAdmin: boolean;
        orders: import("../orders/entities/order.entity").Orders[];
    }>;
}
