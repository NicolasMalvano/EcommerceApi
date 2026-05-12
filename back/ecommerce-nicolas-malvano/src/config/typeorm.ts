import {config as dotenvConfig} from 'dotenv'
import { registerAs } from '@nestjs/config';
import { DataSource , DataSourceOptions } from 'typeorm';

dotenvConfig({path: './.env.development'});
//PREGUNTAR AL PROF SI LO HACEMOS CON EL CONFIGSERVICE
const config  = {
    type: 'postgres',   
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    //host: 'postgresdb',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true, 
    synchronize: true,
    logging: true, 
    dropSchema: true
}

export const typeOrmConfig =  registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions)