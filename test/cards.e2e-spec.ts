import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createApp } from './helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let fullDeckId;
  let shortDeckId;
  const drawCount = 5;

  beforeAll(async () => {
    app = await createApp();
  });
  afterAll(async () => await app.close());

  it('should create full deck', () => {
    return request(app.getHttpServer())
      .post('/cards')
      .set('Accept', 'application/json')
      .send({
        shuffled: false,
        type: 'FULL',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        fullDeckId = res.body.deckId;
        expect(res.body.deckId).toBeDefined();
        expect(res.body.type).toEqual('FULL');
        expect(res.body.shuffled).toBeFalsy();
        expect(res.body.remaining).toEqual(52);
      });
  });
  it('should create short deck', () => {
    return request(app.getHttpServer())
      .post('/cards')
      .set('Accept', 'application/json')
      .send({
        shuffled: false,
        type: 'SHORT',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        shortDeckId = res.body.deckId;
        expect(res.body.deckId).toBeDefined();
        expect(res.body.type).toEqual('SHORT');
        expect(res.body.shuffled).toBeFalsy();
        expect(res.body.remaining).toEqual(32);
      });
  });

  it('should draw full deck', () => {
    return request(app.getHttpServer())
      .get(`/cards/draw/${drawCount}/${fullDeckId}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.cards).toBeDefined();
        expect(res.body.cards.length).toEqual(drawCount);
      });
  });
  it('should open full deck and verify remaining count', () => {
    return request(app.getHttpServer())
      .get(`/cards/${fullDeckId}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect((res) => {
        const deckTotalLength = res.body.type === 'SHORT' ? 32 : 52;
        expect(res.body.cards).toBeDefined();
        expect(res.body.cards.length).toEqual(deckTotalLength - drawCount);
      });
  });

  it('should draw short deck', () => {
    return request(app.getHttpServer())
      .get(`/cards/draw/${drawCount}/${shortDeckId}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.cards).toBeDefined();
        expect(res.body.cards.length).toEqual(drawCount);
      });
  });

  it('should open short deck and verify remaining count', () => {
    return request(app.getHttpServer())
      .get(`/cards/${shortDeckId}`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .expect((res) => {
        const deckTotalLength = res.body.type === 'SHORT' ? 32 : 52;
        expect(res.body.cards).toBeDefined();
        expect(res.body.cards.length).toEqual(deckTotalLength - drawCount);
      });
  });

  it('should throw error on invalid deckId', () => {
    return request(app.getHttpServer())
      .get(`/cards/29be669f-9923-47b6-b869-b08557570e15`)
      .set('Accept', 'application/json')
      .expect(HttpStatus.NOT_FOUND)
      .expect((res) => {
        expect(res.body.message).toEqual('Deck not found');
      });
  });
});
