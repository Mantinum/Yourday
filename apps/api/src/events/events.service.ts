import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  create(dto: any) {
    return { id: 'evt_1', ...dto };
  }

  findAll() {
    return [{ id: 'evt_1', name: 'Anniversaire', date: '2024-06-01' }];
  }

  findOne(id: string) {
    return { id, name: 'Anniversaire', date: '2024-06-01' };
  }
}
