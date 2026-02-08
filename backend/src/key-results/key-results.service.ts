import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';
import { KeyResultNotFoundException } from '../common/exceptions/key-result-not-found.exception';

@Injectable()
export class KeyResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const keyResults = await this.prisma.keyResult.findMany();
    if (!keyResults) {
      throw new Error('No key results found');
    }
    return keyResults;
  }

  async getKeyResultById(id: number) {
    const keyResult = await this.prisma.keyResult.findUnique({
      where: { id },
    });
    if (!keyResult) {
      throw new KeyResultNotFoundException(id);
    }
    return keyResult;
  }

  async getKeyResultByObjectiveId(objectiveId: number) {
    const keyResults = await this.prisma.keyResult.findMany({
      where: { objectiveId },
    });

    if (!keyResults) {
      throw new Error(
        `No key results found for objective with id ${objectiveId}`,
      );
    }
    return keyResults;
  }
  async create(objectiveId: number, dtos: CreateKeyResultDto[]) {
    const objective = await this.prisma.objective.findUnique({
      where: { id: objectiveId },
    });

    if (!objective) {
      throw new Error(`Objective with id ${objectiveId} not found`);
    }

    return this.prisma.keyResult.createMany({
      data: dtos.map((dto) => ({
        description: dto.description,
        progress: Number(dto.progress),
        objectiveId,
      })),
    });
  }

  async update(id: number, dto: UpdateKeyResultDto) {
    const keyResult = await this.prisma.keyResult.findUnique({
      where: { id },
    });
    if (!keyResult) {
      throw new KeyResultNotFoundException(id);
    }

    return this.prisma.keyResult.update({
      where: { id },
      data: {
        ...dto,
        progress: dto.progress !== undefined ? Number(dto.progress) : undefined,
      },
    });
  }

  async delete(id: number) {
    const keyResult = await this.prisma.keyResult.findUnique({
      where: { id },
    });
    if (!keyResult) {
      throw new KeyResultNotFoundException(id);
    }
    return this.prisma.keyResult.delete({
      where: { id },
    });
  }
}
