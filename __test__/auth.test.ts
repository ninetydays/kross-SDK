import { hmacHashString, KrossClient } from '../src/kross-client'
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// BUGGY UNIT-TEST

const OLIVE_BASE_URL = 'http://olive-dev.kross.kr/'

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const credentials = {
    keyid: 'abc124@kross.kr',
    password: '12345',
    signMeInFor30days: false,
  };


  describe('/auth/login (POST)', () => {
    it('returns 201 with valid HMAC Authorization header', () => {
      const accessId = '2ZAK7ZDWMDQ1LD32';
      const secretKey = 'h3tfeJI6K9iAXloanvZ6';
      const date = new Date().toUTCString();
      const hashString = hmacHashString(secretKey, [date, 'post'].join(' '));

      return request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials)
        .set('X-Date', date)
        .set('Authorization', `KROSS ${accessId}:${hashString}`)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              token: expect.any(String),
              refresh: expect.any(String),
            }),
          );
        });
    });
    it('returns 401 without HMAC Authorization header', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .expect(401)
        .then((response) => {
          expect(response.body).toMatchInlineSnapshot(`
            Object {
              "message": "Unauthorized",
              "statusCode": 401,
            }
          `);
        });
    });
    it('returns 401 with invalid HMAC Authorization header', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Authorization', 'KROSS invalidformat')
        .expect(401)
        .then((response) => {
          expect(response.body).toMatchInlineSnapshot(`
            Object {
              "message": "Unauthorized",
              "statusCode": 401,
            }
          `);
        });
    });
  });
});
