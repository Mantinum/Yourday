import { Injectable } from '@nestjs/common';
import { getRepos } from '../db/repo.factory';
import { EventCreateDto } from '@yourday/shared/src/dto';

const repos = getRepos();

@Injectable()
export class EventsService {
  create(userId: string, dto: EventCreateDto) {
    return repos.events.create({ ...dto, userId });
  }

  findAll(userId: string) {
    return repos.events.findAll(userId);
  }

  findOne(id: string) {
    return repos.events.findById(id);
  }

  update(id: string, dto: Partial<EventCreateDto>) {
    return repos.events.update(id, dto);
  }

  remove(id: string) {
    return repos.events.remove(id);
  }
}
