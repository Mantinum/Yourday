import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipientsService {
  create(dto: any) {
    return { id: 'rec_1', ...dto };
  }

  findAll() {
    return [{ id: 'rec_1', name: 'Alice' }];
  }

  findOne(id: string) {
    return { id, name: 'Alice' };
  }
}
