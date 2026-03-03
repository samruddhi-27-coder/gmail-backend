import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailsService } from './mails.service';
import { CreateMailDto } from './dto/create-mail.dto';

@ApiTags('Mails')
@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}

  @Get('inbox')
  getInbox() {
    return this.mailsService.getInbox();
  }

  @Get('sent')
  getSent() {
    return this.mailsService.getSent();
  }

  @Get('trash')
  getTrash() {
    return this.mailsService.getTrash();
  }

  // 📩 UNREAD MAILS
  @Get('inbox/unread')
  getUnreadInbox() {
    return this.mailsService.getUnreadInbox();
  }

  // 🔍 SEARCH + PAGINATION
  @Get('inbox/search')
  searchInbox(
    @Query('search') search?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '5',
  ) {
    return this.mailsService.searchMails(
      'inbox',
      search,
      Number(page),
      Number(limit),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  sendMail(@Body() createMailDto: CreateMailDto) {
    return this.mailsService.create(createMailDto);
  }

  // 🗑 Move to trash
  @Patch(':id/trash')
  moveToTrash(@Param('id') id: string) {
    return this.mailsService.moveToTrash(id);
  }

  // ♻️ Restore from trash
  @Patch(':id/restore')
  restoreMail(@Param('id') id: string) {
    return this.mailsService.restoreFromTrash(id);
  }

  // 👁 Mark as read
  @Patch(':id/read')
  markMailAsRead(@Param('id') id: string) {
    return this.mailsService.markAsRead(id);
  }
}