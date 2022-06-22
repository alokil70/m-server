import { OrdersEntity } from '../orders.entity';

export interface OrdersResponseInterface {
	orders: OrdersEntity[];
	ordersCount: number;
}
