export interface RecipientsRepo {
  create(data: any): Promise<any>;
  findAll(userId: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  remove(id: string): Promise<void>;
}

export interface EventsRepo {
  create(data: any): Promise<any>;
  findAll(userId: string): Promise<any[]>;
  findById(id: string): Promise<any | null>;
  update(id: string, data: any): Promise<any>;
  remove(id: string): Promise<void>;
}

export interface RecommendationsRepo {
  create(data: any, items: any[]): Promise<any>;
  findByEvent(eventId: string): Promise<any | null>;
  findAll(userId: string): Promise<any[]>;
}

export interface OrdersRepo {
  create(data: any): Promise<any>;
  findAll(userId: string): Promise<any[]>;
}

export interface AuditLogRepo {
  create(data: any): Promise<void>;
  findLatest(kind: string): Promise<any | null>;
}

export interface Repos {
  recipients: RecipientsRepo;
  events: EventsRepo;
  recommendations: RecommendationsRepo;
  orders: OrdersRepo;
  auditLog: AuditLogRepo;
}
