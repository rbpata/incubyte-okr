import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({
            connectionString:
                'postgresql://postgres1:postgres1@localhost:5432/okrs',
        });
        super({
            adapter,
            log: ['query'],
        });
    }
}
