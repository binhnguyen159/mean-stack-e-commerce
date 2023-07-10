import { OrderItem } from './order-item';
import { User } from '@bluebits/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string; //order: street
  shippingAddress2?: string;//order: apartment
  city?: string;//order: city
  zip?: string;//order: zip
  country?: string; //order: country
  phone?: string;//order: phone
  status?: number = 0;
  totalPrice?: number;//
  user?: User | string;
  dateOrdered?: Date;//
}
