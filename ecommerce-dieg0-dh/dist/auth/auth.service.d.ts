import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
import { Users } from 'src/users/enities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
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
