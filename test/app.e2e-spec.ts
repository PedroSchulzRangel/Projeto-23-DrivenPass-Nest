import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { cleanDb } from './utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    await cleanDb();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = new PrismaService();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(HttpStatus.OK)
      .expect("I'm okay!");
  });

  it('/users/sign-up => should sign-up succesfully', async () => {
    await request(app.getHttpServer())
    .post('/users/sign-up')
    .send({
      email: 'test@test.com',
      password: "S&nh@Fort&1234"
    })
    .expect(HttpStatus.CREATED);

    const user = await prisma.user.findFirst({
      where: {
        email: 'test@test.com'
      }
    });

    expect(user).not.toBe(null);
  })

  it('/users/sign-up => should deny a sign-up when data is wrong', async () => {
    const response = await request(app.getHttpServer())
    .post('/users/sign-up')
    .send({
      email: 'test@test.com',
    })
    .expect(HttpStatus.BAD_REQUEST);

  const errorMessages: string[] = response.body.message;
  expect(errorMessages).toContain('password should not be empty');
  })
})
;
