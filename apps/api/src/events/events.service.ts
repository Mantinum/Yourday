import { Injectable } from '@nestjs/common';
import { EventCreateDto } from '@yourday/shared/src/dto';
import { fakeRepo } from '../fake/fake-repo.js';

@Injectable()
export class EventsService {
  create(userId: string, dto: EventCreateDto) {
    return fakeRepo.events.create({ ...dto, userId });
  }

  findAll(userId: string) {
    return fakeRepo.events.findAll(userId);
  }

  findOne(id: string) {
    return fakeRepo.events.findById(id);
  }

  update(id: string, dto: Partial<EventCreateDto>) {
    return fakeRepo.events.update(id, dto);
  }

  remove(id: string) {
    return fakeRepo.events.remove(id);
  }
}
