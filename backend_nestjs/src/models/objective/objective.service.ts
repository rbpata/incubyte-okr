import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ObjectiveDto } from './dto/objective.dto';
import { PrismaService } from '../../prisma.service';
import { KeyResultService } from './key-result/key-result.service';
import { KeyResultDto } from './key-result/dto/key-result.dto';
import { KeyResult } from '../../../generated/prisma/client';

@Injectable()
export class ObjectiveService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly keyResultService: KeyResultService,
    ) {}
    getAll() {
        return this.prismaService.objective.findMany({
            include: {
                keyResults: {
                    orderBy: {
                        created_at: 'asc',
                    },
                },
            },
            orderBy: {
                created_at: 'asc',
            },
        });
    }

    getOneById(id: string) {
        return this.prismaService.objective.findUnique({
            where: {
                id: id,
            },
            include: {
                keyResults: true,
            },
        });
    }

    getAllByTitle(title: string) {
        return this.prismaService.objective.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
            include: {
                keyResults: true,
            },
        });
    }
    create(createObjectiveDto: ObjectiveDto) {
        return this.prismaService.objective.create({
            data: {
                title: createObjectiveDto.title,
                keyResults: {
                    create: createObjectiveDto.keyResults.map((kr) => ({
                        description: kr.description,
                        progress: parseInt(kr.progress, 10),
                    })),
                },
            },
            include: {
                keyResults: true,
            },
        });
    }

    async update(updateObjectiveDto: ObjectiveDto) {
        const objectiveId = updateObjectiveDto.id;
        if (!objectiveId) {
            throw new BadRequestException('Objective is required');
        }
        const isCompleted = await this.checkIsCompletedBasedOnDto(
            updateObjectiveDto.keyResults,
        );
        console.log(isCompleted);

        await this.prismaService.$transaction(async (tx) => {
            await tx.objective.update({
                where: { id: objectiveId },
                data: {
                    title: updateObjectiveDto.title,
                    isCompleted: isCompleted,
                },
            });
            await this.keyResultService.updateOkr(
                objectiveId,
                updateObjectiveDto.keyResults,
                tx,
            );
        });
        const ob = await this.getOneById(objectiveId);
        console.log(ob);
        return ob;
    }

    delete(id: string) {
        return this.prismaService.objective.delete({ where: { id } });
    }

    async checkIsCompletedBasedOnDto(keyResultDto: KeyResultDto[]) {
        let isCompleted = true;

        for (const keyResult of keyResultDto) {
            isCompleted = isCompleted && keyResult.progress === '100';
        }
        return isCompleted;
    }
    private checkIsCompleted(keyResults: KeyResult[]) {
        let isCompleted = true;
        let sum = 0;

        for (const keyResult of keyResults) {
            isCompleted = isCompleted && keyResult.isCompleted;
            sum = sum + keyResult.progress;
        }
        return {
            progress: keyResults.length === 0 ? 100 : sum / keyResults.length,
            isCompleted: isCompleted,
        };
    }

    async setObjectiveStatus(objectiveId: string) {
        const objective = await this.getOneById(objectiveId);
        if (!objective) {
            throw new NotFoundException('Objective not found');
        }

        return this.checkIsCompleted(objective.keyResults);
    }
}
