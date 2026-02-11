import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma.service';
import request from 'supertest';
import {
    PostgreSqlContainer,
    StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { execSync } from 'node:child_process';

describe('Objectives', () => {
    let app: INestApplication;
    let prismaService: PrismaService;
    let postgresContainer: StartedPostgreSqlContainer;

    beforeAll(async () => {
        postgresContainer = await new PostgreSqlContainer('postgres:15')
            .withDatabase('test_okrs')
            .withUsername('test')
            .withPassword('test')
            .start();

        const dbUrl = postgresContainer.getConnectionUri();
        console.log(`DB URL: ${dbUrl}`);
        process.env.DATABASE_URL = dbUrl;
        execSync('npx prisma db push --force-reset', {
            env: { ...process.env, DATABASE_URL: dbUrl },
            stdio: 'inherit',
        });
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
    }, 60_000);

    afterAll(async () => {
        await app.close();
        await postgresContainer.stop();
    });

    beforeEach(async () => {
        prismaService = app.get(PrismaService);
        await prismaService.objective.deleteMany({});
    });
    describe('GET v2/objective', () => {
        it('Should return all the objectives', async () => {
            const prismaService = app.get(PrismaService);
            await prismaService.objective.deleteMany({});
            const objective = {
                title: 'abc',
            };
            const createObjective = await prismaService.objective.create({
                data: objective,
            });

            return request(app.getHttpServer())
                .get('/v2/objective')
                .expect(200)
                .expect([
                    {
                        id: createObjective.id,
                        title: createObjective.title,
                        created_at: createObjective.created_at.toISOString(),
                        isCompleted: createObjective.isCompleted,
                        keyResults: [],
                    },
                ]);
        });
    });
    describe('POST v2/objective', () => {
        it('Should create an objective', async () => {
            const objective = {
                title: 'abc',
                keyResults: [],
            };

            const response = await request(app.getHttpServer())
                .post('/v2/objective')
                .send(objective)
                .expect(201);

            expect(response.body.id).toBeDefined();
            expect(response.body.title).toBe(objective.title);
        });
    });
});
