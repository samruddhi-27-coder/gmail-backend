import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mail } from './schemas/mail.schema';

@Injectable()
export class MailsService {
  constructor(
    @InjectModel(Mail.name)
    private mailModel: Model<Mail>,
  ) {}

  // 📥 Inbox
  getInbox() {
    return this.mailModel.find({ folder: 'inbox' });
  }

  // 📤 Sent
  getSent() {
    return this.mailModel.find({ folder: 'sent' });
  }

  // 🗑 Trash
  getTrash() {
    return this.mailModel.find({ folder: 'trash' });
  }

  // 📩 Unread inbox mails
  getUnreadInbox() {
    return this.mailModel.find({
      folder: 'inbox',
      isRead: false,
    });
  }

  // ✉️ Send mail
  create(mailData: Partial<Mail>) {
    return this.mailModel.create({
      ...mailData,
      folder: 'sent',
    });
  }

  // 🗑 Move to Trash
  moveToTrash(id: string) {
    return this.mailModel.findByIdAndUpdate(
      id,
      { folder: 'trash' },
      { new: true },
    );
  }

  // ♻️ Restore from Trash → Inbox
  restoreFromTrash(id: string) {
    return this.mailModel.findByIdAndUpdate(
      id,
      { folder: 'inbox' },
      { new: true },
    );
  }

  // 👁 Mark mail as read
  markAsRead(id: string) {
    return this.mailModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );
  }

  // 🔍 Search + Pagination
  searchMails(
    folder: string,
    search = '',
    page = 1,
    limit = 5,
  ) {
    const query: any = { folder };

    if (search) {
      query.$or = [
        { from: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    return this.mailModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
  }
}