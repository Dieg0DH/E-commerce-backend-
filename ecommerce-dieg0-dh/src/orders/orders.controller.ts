import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    return this.ordersService.create(userId, products);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }
}
