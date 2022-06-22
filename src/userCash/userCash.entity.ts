import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';
import { OrdersEntity } from '../orders/orders.entity';

@Entity({ name: 'userCash' })
export class UserCashEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	code: number;

	@Column({ select: false })
	password: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}

	@OneToMany(() => OrdersEntity, (order) => order.author)
	orders: OrdersEntity[];
}
