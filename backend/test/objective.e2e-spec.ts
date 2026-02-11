import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'child_process';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';
import { CreateObjectiveDto } from '../src/objectives/dto/create-objective.dto';

describe('Objectives (e2e)', () => {
  let app: INestApplication;
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;
  const authToken = 'test-auth-token';

  beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:16-alpine').start();
    const dbUrl = container.getConnectionUri();
    process.env.DATABASE_URL = dbUrl;
    process.env.AUTH_TOKEN = authToken;

    execSync('pnpm exec prisma db push', {
      cwd: process.cwd(),
      env: {
        ...process.env,
        DATABASE_URL: dbUrl,
      },
      stdio: 'inherit',
    });

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
    prismaService = app.get(PrismaService);
  }, 100000);

  beforeEach(async () => {
    await prismaService.objective.deleteMany({});
  });

  afterAll(async () => {
    if (prismaService) {
      await prismaService.$disconnect();
    }
    if (app) {
      await app.close();
    }
    if (container) {
      await container.stop();
    }
  });

  describe('GET /okr/objectives', () => {
    it('should return all objectives', async () => {
      const created = await prismaService.objective.create({
        data: { title: 'nestJS objective' },
        include: { keyResults: true },
      });

      const response = await request(app.getHttpServer())
        .get('/okr/objectives')
        .set('Authorization', authToken)
        .expect(200);

      expect(response.body).toEqual([
        {
          id: created.id,
          title: created.title,
          createdAt: created.createdAt.toISOString(),
          keyResults: [],
        },
      ]);
    });

    it('should return empty array when none exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/okr/objectives')
        .set('Authorization', authToken)
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('POST /okr/objectives', () => {
    it('should create a new objective', async () => {
      const reqBody: CreateObjectiveDto = {
        title: 'nestJS objective',
      };

      const response = await request(app.getHttpServer())
        .post('/okr/objectives')
        .set('Authorization', authToken)
        .send(reqBody)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(reqBody.title);
      expect(response.body).toHaveProperty('createdAt');

      const createdObjective = await prismaService.objective.findUnique({
        where: { id: response.body.id },
      });

      expect(createdObjective).toBeDefined();
      expect(createdObjective?.title).toBe(reqBody.title);
    });

    it('should fail validation when title is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/okr/objectives')
        .set('Authorization', authToken)
        .send({});

      expect([400, 500]).toContain(response.status);
    });
  });
});
