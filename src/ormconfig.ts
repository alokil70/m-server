import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '1234',
	database: 'mserver',
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: true,
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		migrationsDir: 'src/migrations',
	},
};

export default config;
