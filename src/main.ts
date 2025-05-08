import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        // urls: ['amqp://guest:guest@127.0.0.1:5672'],
        queue: 'email-queue',
        queueOptions: {
          durable: true,
        },
        // socketOptions: {
        //   frameMax: 131072,
        // },
      },
    },
  );
  await app.listen();
}
bootstrap();
