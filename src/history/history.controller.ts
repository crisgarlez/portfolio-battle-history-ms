import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { HistoryRecord } from './history-record.entity';
import { HistoryService } from './history.service';

@Controller('battles')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @EventPattern('create-reccord-topic')
  async createReccordTopic(@Payload() data: any, @Ctx() context: KafkaContext) {
    console.log(`Topic: ${context.getTopic()}`);
    console.log('#createReccordTopic#');
    console.log('data: ' + JSON.stringify(data));

    const { offset } = context.getMessage();
    const partition = context.getPartition();
    const topic = context.getTopic();
    // await this.client.commitOffsets([{ topic, partition, offset }]);
    return await this.historyService.create(data);
  }
}
