import { BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserCashEntity } from '../userCash/userCash.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity({ name: 'orders' })
export class OrdersEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	num: number;

	@Column()
	table: number;

	@Column()
	position: number;

	@Column()
	creator: string;

	@Column({ default: '' })
	description: string;

	@Column({ default: 0 })
	total: number;

	@Column()
	opened: boolean;

	@Column()
	payed: boolean;

	@Column({ default: 0 })
	commonShift: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column()
	guid: string;

	@BeforeUpdate()
	updateTimestamp() {
		this.updatedAt = new Date();
	}

	@ManyToOne(() => UserCashEntity, (user) => user.orders)
	author: UserCashEntity;

	@ManyToMany(() => ProductsEntity, (products) => products.orders)
	@JoinTable()
	products: ProductsEntity[];
}
