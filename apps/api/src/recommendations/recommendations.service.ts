import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import path from 'path';
import { getRepos } from '../db/repo.factory';

const repos = getRepos();
const fixturesPath = path.join(__dirname, 'integrations', 'amazon', 'fixtures.json');
const fixtures = JSON.parse(readFileSync(fixturesPath, 'utf-8'));

@Injectable()
export class RecommendationsService {
  async generateForEvent(eventId: string) {
    const event = await repos.events.findById(eventId);
    if (!event) throw new Error('event not found');
    const recipient = event.recipient || { interests: [], avoid: [] };
    const products = fixtures.filter((p: any) =>
      !recipient.avoid?.some((a: string) => p.categories.includes(a)),
    );
    const scored = products
      .map((p: any) => {
        const matchInterests = jaccard(recipient.interests || [], p.categories || []);
        const budgetProximity = budgetScore(p.priceEur, event.budgetEur);
        const ratingNorm = (p.rating || 0) / 5;
        const score = 0.5 * matchInterests + 0.3 * budgetProximity + 0.2 * ratingNorm;
        return { ...p, score, url: this.buildAffiliateUrl(p.url, 'partner') };
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 5);
    const recommendation = await repos.recommendations.create(
      { userId: event.userId, eventId, createdAt: new Date().toISOString() },
      scored,
    );
    await repos.auditLog.create({
      userId: event.userId,
      kind: 'JOB',
      message: `generated recommendations for ${eventId}`,
    });
    return recommendation;
  }

  buildAffiliateUrl(url: string, partnerTag: string) {
    return url.includes('?') ? `${url}&tag=${partnerTag}` : `${url}?tag=${partnerTag}`;
  }

  findByEvent(eventId: string) {
    return repos.recommendations.findByEvent(eventId);
  }
}

function jaccard(a: string[], b: string[]) {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...a, ...b]);
  return union.size ? intersection.size / union.size : 0;
}

function budgetScore(price: number, budget: number) {
  if (!price || !budget) return 0;
  const diff = Math.abs(price - budget);
  const maxVal = Math.max(price, budget);
  const val = 1 - diff / maxVal;
  return val < 0 ? 0 : val > 1 ? 1 : val;
}
