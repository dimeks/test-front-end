import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

type HostOptions = {
  path: string;
  host: string;
  admin: string;
  webapp: string;
  port: number;
};

type YoutubeOptions = {
  key: string;
};

type JWTOptions = {
  secret: string;
};


export class ConfigService {
  env: any;

  constructor(mode: string) {
    if (mode === 'development') {
      this.env = dotenv.parse(fs.readFileSync('.env.development'));
    } else if (mode === 'test') {
      this.env = dotenv.parse(fs.readFileSync('.env.test'));
    } else {
      this.env = process.env;
    }
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      return undefined;
      // throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode == 'PROD';
  }

  public getHostConfig(): HostOptions {
    const env: any = {
      path: `${this.getValue('HOST')}:${parseInt(this.getValue('PORT'))}`,
      host: this.getValue('HOST'),
      admin: this.getValue('ADMIN'),
      webapp: this.getValue('ADMIN'),
      port: parseInt(this.getValue('PORT')),
    };
    return env;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const env: any = {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: ['dist/modules/**/*.entity.{ts,js}'],
      migrationsTableName: 'migration',
      migrations: ['dist/migration/*.{ts,js}'],
      cli: {
        entitiesDir: 'dist/modules',
        migrationsDir: 'dist/migration',
      },
      synchronize: this.getValue('DB_SYNC') === 'true',
      // ssl: this.getValue('DB_SSL') === 'true',
      // ssl: true,
      migrationsRun: this.getValue('DB_MIGRATIONS_RUN') === 'true',
      logging: this.getValue('DB_LOGGING') === 'true',
      autoLoadEntities: true,
    };

    if (this.isProduction()) {
      env.extra = {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    return env;
  }

  public getYoutubeConfig(): YoutubeOptions {
    return {
      key: this.getValue('YOUTUBE_KEY'),
    };
  }

  public getJWTConfig(): JWTOptions {
    return {
      secret: this.getValue('JWT_SECRET'),
    };
  }

}
