function id() {
  return Math.random().toString(36).slice(2);
}

const recipients = new Map<string, any>();
const events = new Map<string, any>();
const recommendations = new Map<string, any>();
const orders = new Map<string, any>();
const auditLogs: any[] = [];

export const fakeRepo = {
  recipients: {
    async create(data: any) {
      const rec = { id: id(), ...data };
      recipients.set(rec.id, rec);
      return rec;
    },
    async findAll(userId: string) {
      return Array.from(recipients.values()).filter(r => r.userId === userId);
    },
    async findById(recId: string) {
      return recipients.get(recId) || null;
    },
    async update(recId: string, data: any) {
      const rec = { ...recipients.get(recId), ...data };
      recipients.set(recId, rec);
      return rec;
    },
    async remove(recId: string) {
      recipients.delete(recId);
    },
  },
  events: {
    async create(data: any) {
      const ev = { id: id(), ...data };
      events.set(ev.id, ev);
      return ev;
    },
    async findAll(userId: string) {
      return Array.from(events.values()).filter(e => e.userId === userId);
    },
    async findById(eventId: string) {
      const ev = events.get(eventId);
      if (!ev) return null;
      const recipient = recipients.get(ev.recipientId);
      return { ...ev, recipient };
    },
    async update(eventId: string, data: any) {
      const ev = { ...events.get(eventId), ...data };
      events.set(eventId, ev);
      return ev;
    },
    async remove(eventId: string) {
      events.delete(eventId);
    },
  },
  recommendations: {
    async create(data: any, items: any[]) {
      const rec = { id: id(), ...data, items: items.map(it => ({ id: id(), ...it })) };
      recommendations.set(rec.id, rec);
      return rec;
    },
    async findByEvent(eventId: string) {
      const recs = Array.from(recommendations.values()).filter(r => r.eventId === eventId);
      return recs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0] || null;
    },
    async findAll(userId: string) {
      return Array.from(recommendations.values())
        .filter(r => r.userId === userId)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    },
  },
  orders: {
    async create(data: any) {
      const ord = { id: id(), ...data };
      orders.set(ord.id, ord);
      return ord;
    },
    async findAll(userId: string) {
      return Array.from(orders.values())
        .filter(o => o.userId === userId)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    },
  },
  auditLog: {
    async create(data: any) {
      auditLogs.push({ id: id(), createdAt: new Date().toISOString(), ...data });
    },
    async findLatest(kind: string) {
      return auditLogs
        .filter(a => a.kind === kind)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0] || null;
    },
  },
};
