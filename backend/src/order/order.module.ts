import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, orderModel } from './model/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ schema: orderModel, name: Order.name }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
