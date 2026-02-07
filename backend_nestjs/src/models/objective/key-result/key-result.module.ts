import { Module } from '@nestjs/common';
import { KeyResultController } from './key-result.controller';
import { KeyResultService } from './key-result.service';
import { PrismaService } from '../../../prisma.service';

@Module({
    controllers: [KeyResultController],
    providers: [KeyResultService, PrismaService],
})
export class KeyResultModule {}
