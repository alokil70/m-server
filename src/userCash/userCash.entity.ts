import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcryptjs';

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
}
