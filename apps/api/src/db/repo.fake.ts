import { Repos } from './repo.types';

function id() {
  return Math.random().toString(36).slice(2);
}

export function createFakeRepos(): Repos {
  const recipients = new Map<string, any>();
  const events = new Map<string, any>();
  const recommendations = new Map<string, any>();
  const orders = new Map<string, any>();
  const auditLogs: any[] = [];

  return {
    recipients: {
      async create(data) {
        const rec = { id: id(), ...data };
        recipients.set(rec.id, rec);
        return rec;
      },
      async findAll(userId) {
        return Array.from(recipients.values()).filter(r => r.userId === userId);
      },
      async findById(recId) {
        return recipients.get(recId) || null;
      },
      async update(recId, data) {
        const rec = { ...recipients.get(recId), ...data };
        recipients.set(recId, rec);
        return rec;
      },
      async remove(recId) {
        recipients.delete(recId);
      },
    },
    events: {
      async create(data) {
        const ev = { id: id(), ...data };
        events.set(ev.id, ev);
        return ev;
      },
      async findAll(userId) {
        return Array.from(events.values()).filter(e => e.userId === userId);
      },
      async findById(eventId) {
        const ev = events.get(eventId);
        if (!ev) return null;
        const recipient = recipients.get(ev.recipientId);
        return { ...ev, recipient };
      },
      async update(eventId, data) {
        const ev = { ...events.get(eventId), ...data };
        events.set(eventId, ev);
        return ev;
      },
      async remove(eventId) {
        events.delete(eventId);
      },
    },
    recommendations: {
      async create(data, items) {
        const rec = { id: id(), ...data, items: items.map(it => ({ id: id(), ...it })) };
        recommendations.set(rec.id, rec);
        return rec;
      },
      async findByEvent(eventId) {
        const recs = Array.from(recommendations.values()).filter(r => r.eventId === eventId);
        return recs.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0] || null;
      },
      async findAll(userId) {
        return Array.from(recommendations.values())
          .filter(r => r.userId === userId)
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      },
    },
    orders: {
      async create(data) {
        const ord = { id: id(), ...data };
        orders.set(ord.id, ord);
        return ord;
      },
      async findAll(userId) {
        return Array.from(orders.values())
          .filter(o => o.userId === userId)
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      },
    },
    auditLog: {
      async create(data) {
        auditLogs.push({ id: id(), createdAt: new Date().toISOString(), ...data });
      },
      async findLatest(kind) {
        return auditLogs
          .filter(a => a.kind === kind)
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0] || null;
      },
    },
  };
}
