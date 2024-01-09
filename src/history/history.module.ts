import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryController } from './history.controller';
import { HistoryRecord } from './history-record.entity';
import { HistoryService } from './history.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RANKINGMS_PACKAGE_NAME } from './ranking';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryRecord]),
    ClientsModule.register([
      {
        name: 'RANKING_MS',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:3007',
          package: RANKINGMS_PACKAGE_NAME,
          protoPath: join(__dirname, 'ranking.proto'),
        },
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
