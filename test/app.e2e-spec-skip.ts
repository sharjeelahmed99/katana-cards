import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createApp } from './helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });
  afterAll(() => app.close());

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200);
  });
});
