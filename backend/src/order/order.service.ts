import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './model/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly ordermodel: Model<Order>,
  ) { }


  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const lastOrderNo = await this.ordermodel.findOne().sort({ orderId: -1 }).exec();
    const nextId = lastOrderNo && lastOrderNo.orderId
      ? Number(lastOrderNo.orderId.replace('AZS000', '')) + 1
      : 1;
    const generatedId = `AZS000${nextId}`;
    const createdOrder = new this.ordermodel({
      ...createOrderDto,
      orderId: generatedId,
      price: this.calculatePrice(createOrderDto.distance, createOrderDto.isUrgent),
      status: 'new',
    });
    return createdOrder.save();
  }


  async findAll(): Promise<Order[]> {
    return this.ordermodel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(orderId: string): Promise<Order> {
    return this.ordermodel.findOne({ orderId }).exec();
  }

  // Sadə qiymət hesablaması — bunu utils faylında saxlamaq da olar
  private calculatePrice(distance: number, isUrgent = false): number {
    let price = 0;

    if (distance <= 2) price = 3;
    else if (distance <= 5) price = 5;
    else if (distance <= 10) price = 8;
    else price = 12 + (distance - 10) * 0.5;

    if (isUrgent) price += 3;
    return Math.round(price * 100) / 100;
  }
}

