import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectiveDto } from './dto/objective.dto';
import { PrismaService } from '../../prisma.service';
import { KeyResultService } from './key-result/key-result.service';

@Injectable()
export class ObjectiveService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly keyResultService: KeyResultService,
    ) {}
    getAll() {
        return this.prismaService.objective.findMany({
            include: {
                keyResults: true,
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
    async create(createObjectiveDto: ObjectiveDto) {
        console.log(createObjectiveDto);
        return this.prismaService.objective.create({
            data: {
                title: createObjectiveDto.title,
                keyResults: {
                    create: createObjectiveDto.keyResults.map((kr) => ({
                        description: kr.description,
                        progress: kr.progress,
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
        const objective = await this.prismaService.objective.update({
            where: {
                id: objectiveId,
            },
            data: {
                title: updateObjectiveDto.title, // assert title should not be undefined in pipe
            },
            include: {
                keyResults: true,
            },
        });

        const keyResultsToBeDeleted: string[] = updateObjectiveDto.keyResults
            .filter(
                (
                    kr,
                ): kr is {
                    id: string;
                    description: string;
                    progress: number;
                    toDelete: boolean;
                } => {
                    return kr.toDelete;
                },
            )
            .map((kr) => kr.id);
        await this.keyResultService.deleteAll(keyResultsToBeDeleted);
        for (const keyResult of updateObjectiveDto.keyResults) {
            if (keyResult.id) {
                await this.keyResultService.update(keyResult);
            } else {
                await this.keyResultService.create(keyResult, objective.id);
            }
        }

        return this.getOneById(objective.id);
    }

    delete(id: string) {
        return this.prismaService.objective.delete({ where: { id } });
    }
}
