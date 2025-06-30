import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  packageName: string;
  @Prop({ required: false })
  packageCode: string;
  @Prop({ required: false })
  packageSize: string;
  @Prop({ required: true })
  pickupAddress: string;
  @Prop({ required: true })
  deliveryAddress: string;
  @Prop({ required: true, default: 0 })
  distance: number;
  @Prop({ required: false, default: false })
  isUrgent: boolean;
  @Prop({ required: false })
  deliveryTime: string;
  @Prop({ required: false })
  notes: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true, default: 'new' })
  status: string;
  @Prop({ required: true })
  orderId: string;
}

export const orderModel = SchemaFactory.createForClass(Order);
