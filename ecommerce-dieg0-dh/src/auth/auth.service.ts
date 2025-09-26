import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/enities/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: LoginUserDto) {
    const findUser = await this.usersRepository.findOneBy({
      email: credentials.email,
    });

    if (!findUser) {
      throw new BadRequestException('Wrong Credentials');
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Wrong credentials');
    }
    const payload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }

  async signUp(user: CreateUserDto) {
    const { confirmPassword, ...userWithoutPassword } = user;

    const findUser = await this.usersRepository.findOneBy({
      email: user.email,
    });

    if (findUser) {
      throw new BadRequestException('User already registered');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.usersRepository.save({
      ...userWithoutPassword,
      password: hashedPassword,
    });

    const { password, isAdmin, ...cleanUser } = newUser;

    return cleanUser;
  }
}
