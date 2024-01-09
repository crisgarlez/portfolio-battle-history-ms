import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    name: 'BATTLE_HISTORY_MS',
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'portfolio-battle-history-ms',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'portfolio-battle-history-ms-consumer',
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(3003);
}
bootstrap();
