import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './enities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const ordersByIdDate = user.orders.map((order) => ({
      id: order.id,
      date: order.date,
    }));

    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
      orders: ordersByIdDate,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }

    const { password, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);

    const { password, ...userWithOutPassword } = user;

    return {
      ...userWithOutPassword,
      message: `User with ID ${id} has been deleted`,
    };
  }
}
