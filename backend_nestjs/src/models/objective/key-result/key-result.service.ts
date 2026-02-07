import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { KeyResultDto } from './dto/key-result.dto';

@Injectable()
export class KeyResultService {
    constructor(private readonly prismaService: PrismaService) {}

    create(createKeyResultDto: KeyResultDto, objectiveId: string) {
        return this.prismaService.keyResult.create({
            data: {
                description: createKeyResultDto.description,
                progress: createKeyResultDto.progress,
                objectiveId,
            },
        });
    }

    async update(updateKeyResultDto: KeyResultDto) {
        return this.prismaService.keyResult.update({
            where: {
                id: updateKeyResultDto.id,
            },
            data: updateKeyResultDto,
        });
    }
    delete(keyResultId: string) {
        return this.prismaService.keyResult.delete({
            where: {
                id: keyResultId,
            },
        });
    }
    deleteAll(keyResultIds: string[]) {
        return this.prismaService.keyResult.deleteMany({
            where: {
                id: {
                    in: keyResultIds,
                },
            },
        });
    }
}
