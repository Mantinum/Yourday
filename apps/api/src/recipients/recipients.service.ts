import { Injectable } from '@nestjs/common';
import { getRepos } from '../db/repo.factory';
import { RecipientCreateDto } from '@yourday/shared/src/dto';

const repos = getRepos();

@Injectable()
export class RecipientsService {
  create(userId: string, dto: RecipientCreateDto) {
    return repos.recipients.create({ ...dto, userId });
  }

  findAll(userId: string) {
    return repos.recipients.findAll(userId);
  }

  findOne(id: string) {
    return repos.recipients.findById(id);
  }

  update(id: string, dto: Partial<RecipientCreateDto>) {
    return repos.recipients.update(id, dto);
  }

  remove(id: string) {
    return repos.recipients.remove(id);
  }
}
