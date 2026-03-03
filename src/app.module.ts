import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailsModule } from './mails/mails.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 🔹 Load .env file globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 🔹 MongoDB connection using .env
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // 🔹 Feature modules
    MailsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}