import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(credentials: LoginUserDto): Promise<string>;
    signUp(user: CreateUserDto): Promise<{
        name: string;
        email: string;
        address: string;
        phone: number;
        city: string;
        country: string;
        id: string;
        orders: import("../orders/entities/order.entity").Orders[];
    }>;
}
