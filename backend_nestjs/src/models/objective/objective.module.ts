import { Module } from '@nestjs/common';
import { ObjectiveController } from './objective.controller';
import { ObjectiveService } from './objective.service';
import { PrismaService } from '../../prisma.service';
import { KeyResultService } from './key-result/key-result.service';

@Module({
    controllers: [ObjectiveController],
    providers: [ObjectiveService, PrismaService, KeyResultService],
})
export class ObjectiveModule {}
