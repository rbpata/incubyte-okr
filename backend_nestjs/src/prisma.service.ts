import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env['DATABASE_URL'],
            // 'postgresql://postgres1:postgres1@localhost:5433/okrs',
        });
        super({
            adapter,
            log: ['query'],
        });
    }
}
