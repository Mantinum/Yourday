import { Injectable } from '@nestjs/common';
import { RecipientCreateDto } from '@yourday/shared/src/dto';
import { fakeRepo } from '../fake/fake-repo.js';

@Injectable()
export class RecipientsService {
  create(userId: string, dto: RecipientCreateDto) {
    return fakeRepo.recipients.create({ ...dto, userId });
  }

  findAll(userId: string) {
    return fakeRepo.recipients.findAll(userId);
  }

  findOne(id: string) {
    return fakeRepo.recipients.findById(id);
  }

  update(id: string, dto: Partial<RecipientCreateDto>) {
    return fakeRepo.recipients.update(id, dto);
  }

  remove(id: string) {
    return fakeRepo.recipients.remove(id);
  }
}
