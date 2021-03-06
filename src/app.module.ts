import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TagModule } from 'src/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'src/ormconfig';
import { UserModule } from 'src/user/user.module';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';
import { UserCashModule } from './userCash/userCash.module';
import { AuthCashMiddleware } from 'src/userCash/middlewares/authCash.middleware';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconfig),
		TagModule,
		UserModule,
		UserCashModule,
		CategoryModule,
		ProductsModule,
		OrdersModule,
		ArticleModule,
		ProfileModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthCashMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}
}
