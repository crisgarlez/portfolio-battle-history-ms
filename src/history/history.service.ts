import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryRecord } from './history-record.entity';
import { Observable, lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { RANKING_SERVICE_NAME, RankingServiceClient } from './ranking';

@Injectable()
export class HistoryService implements OnModuleInit {
  private rankingService: RankingServiceClient;

  constructor(
    @InjectRepository(HistoryRecord)
    private historyRecordRepository: Repository<HistoryRecord>,
    @Inject('RANKING_MS') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.rankingService =
      this.client.getService<RankingServiceClient>(RANKING_SERVICE_NAME);
  }

  async create(record: any): Promise<HistoryRecord> {
    console.log('create');

    const historyRecord = new HistoryRecord();

    historyRecord.battletime = record.battletime;
    historyRecord.monstera = record.monstera;
    historyRecord.monsterb = record.monsterb;
    historyRecord.winner = record.winnerid;

    try {
      const result$ = this.rankingService.sendResult({
        winnerid: record.winnerid,
        winnername: record.winnername,
        defeatedid: record.loserid,
        defeatedname: record.losername,
      });
      console.log('gRPC enviado');

      const result = await lastValueFrom(result$);

      console.log('result:' + result);
    } catch (error) {
      console.log('error: ' + error);
    }

    return await this.historyRecordRepository.save(historyRecord);
  }
}
