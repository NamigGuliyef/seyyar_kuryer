import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './model/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }


  @Post('create')
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get('all')
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('track/:orderId')
  async findOne(@Param('orderId') orderId: string): Promise<Order> {
    return this.orderService.findOne(orderId);
  }

}

