import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoryModule } from './history/history.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { enviroments } from './config/environments';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      validationSchema: Joi.object({
        APP_VERSION: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
