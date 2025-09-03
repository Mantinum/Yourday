import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';
import type { INestApplication } from '@nestjs/common';

let app: INestApplication;

beforeAll(async () => {
  app = await NestFactory.create(AppModule);
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('Health', () => {
  it('GET /health', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
