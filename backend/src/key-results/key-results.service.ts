import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';

@Injectable()
export class KeyResultsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.keyResult.findMany();
  }

  async getKeyResultById(id: number) {
    const keyResult = await this.prisma.keyResult.findUnique({
      where: { id },
    });
    if (!keyResult) {
      throw new Error(`Key Result with id ${id} not found`);
    }
    return keyResult;
  }

  async getKeyResultByObjectiveId(objectiveId: number) {
    const keyResults = await this.prisma.keyResult.findMany({
      where: { objectiveId },
    });

    if (!keyResults) {
      throw new Error(
        `No Key Results found for Objective with id ${objectiveId}`,
      );
    }
    return keyResults;
  }
  async create(objectiveId: number, dtos: CreateKeyResultDto[]) {
    return this.prisma.keyResult.createMany({
      data: dtos.map((dto) => ({
        description: dto.description,
        progress: Number(dto.progress),
        objectiveId,
      })),
    });
  }

  async update(id: number, dto: UpdateKeyResultDto) {
    return this.prisma.keyResult.update({
      where: { id },
      data: {
        ...dto,
        progress: dto.progress !== undefined ? Number(dto.progress) : undefined,
      },
    });
  }

  delete(id: number) {
    return this.prisma.keyResult.delete({
      where: { id },
    });
  }
}
