import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';
import { ArticleEntity } from 'src/article/article.entity';
import { OrdersEntity } from '../orders/orders.entity';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	username: string;

	@Column({ default: '' })
	bio: string;

	@Column({ default: '' })
	image: string;

	@Column({ select: false })
	password: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}

	@OneToMany(() => OrdersEntity, (order) => order.author)
	orders: OrdersEntity[];

	@ManyToMany(() => ArticleEntity)
	@JoinTable()
	favorites: ArticleEntity[];
}
