import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';
import { Mail, MailSchema } from './schemas/mail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mail.name, schema: MailSchema },
    ]),
  ],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}