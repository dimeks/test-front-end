import { DataSource } from 'typeorm';
import { ConfigService } from '../config/config.service';

const configService = new ConfigService(process.env.NODE_ENV || 'production');

const config = configService.getTypeOrmConfig() as any

if (configService.env.MODE === 'DEV') {
    config.host = 'localhost';
}


console.log(`-- TYPEORM ENV ${configService.env.MODE} -- `);
console.log(config);
console.log('-- /TYPEORM ENV --');

export const AppDataSource = new DataSource(config)