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

interface ObjectiveResponse {
  id: number;
  title: string;
  createdAt: string;
  keyResults: unknown[];
}

describe('Objectives (e2e)', () => {

  let app: INestApplication;
  let container: StartedPostgreSqlContainer;
  let prismaService: PrismaService;

  const projectRoot = process.cwd(); // ✅ FIXED

  beforeAll(async () => {
    // 1️⃣ Start PostgreSQL test container
    container = await new PostgreSqlContainer('postgres:16-alpine').start();

    const dbUrl = container.getConnectionUri();
    process.env.DATABASE_URL = dbUrl;

    // 2️⃣ Push Prisma schema to test DB
    execSync('npx prisma db push --skip-generate', {
      cwd: projectRoot,
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: dbUrl,
        npm_config_yes: 'true',
      },
    });

    // 3️⃣ Create Nest application
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
  });

  beforeEach(async () => {
    // Clean DB before every test
    await prismaService.objective.deleteMany({});
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
    await container.stop();
  });

  // ============================
  // GET TESTS
  // ============================

  describe('GET /okr/objectives', () => {
    it('should return all objectives', async () => {
      const created = await prismaService.objective.create({
        data: { title: 'nestJS objective' },
        include: { keyResults: true },
      });

      const response = await request(app.getHttpServer())
        .get('/okr/objectives')
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
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  // ============================
  // POST TESTS
  // ============================

  describe('POST /okr/objectives', () => {
    it('should create a new objective', async () => {
      const reqBody: CreateObjectiveDto = {
        title: 'nestJS objective',
      };

      const response = await request(app.getHttpServer())
        .post('/okr/objectives')
        .send(reqBody)
        .expect(201);

      const body = response.body as ObjectiveResponse;

      expect(body).toHaveProperty('id');
      expect(body.title).toBe(reqBody.title);
      expect(body).toHaveProperty('createdAt');

      const createdObjective = await prismaService.objective.findUnique({
        where: { id: body.id },
      });

      expect(createdObjective).toBeDefined();
      expect(createdObjective?.title).toBe(reqBody.title);
    });

    it('should fail validation when title is too short', async () => {
      await request(app.getHttpServer())
        .post('/okr/objectives')
        .send({ title: 'abc' })
        .expect(400);
    });

    it('should fail validation when title is missing', async () => {
      await request(app.getHttpServer())
        .post('/okr/objectives')
        .send({})
        .expect(400);
    });
  });
});
