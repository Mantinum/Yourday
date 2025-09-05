import { before, after, test } from 'node:test';
import assert from 'node:assert/strict';
import { INestApplication } from '@nestjs/common';
import { Test as NestTest } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

let app: INestApplication;

before(async () => {
  const moduleRef = await NestTest.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  await app.init();
});

after(async () => {
  await app.close();
});

test('GET /health', async () => {
  const res = await request(app.getHttpServer()).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('GET /status', async () => {
  const res = await request(app.getHttpServer()).get('/status');
  assert.equal(res.status, 200);
  assert.ok(res.body.flags);
});
