import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { ObjectiveAlreadyExistsException } from '../common/exceptions/objective-already-exists.exception';
import { ObjectiveNotFoundException } from '../common/exceptions/objective-not-found.exception';
import { KeyResult } from '../../generated/prisma/client';

@Injectable()
class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    const objectives = await this.prismaService.objective.findMany({
      include: { keyResults: true },
    });

    if (!objectives) {
      throw new Error('No objectives found');
    }
    return objectives;
  }

  async create(createObjectiveDto: CreateObjectiveDto) {
    const objective = await this.prismaService.objective.findFirst({
      where: {
        title: {
          equals: createObjectiveDto.title,
          mode: 'insensitive',
        },
      },
    });
    if (!objective) {
      return this.prismaService.objective.create({
        data: createObjectiveDto,
      });
    } else {
      throw new ObjectiveAlreadyExistsException(createObjectiveDto.title);
    }
  }

  async update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    const objective = await this.prismaService.objective.findUnique({
      where: { id },
    });
    if (!objective) {
      throw new ObjectiveNotFoundException(id);
    }
    return this.prismaService.objective.update({
      where: { id },
      data: updateObjectiveDto,
    });
  }

  async delete(id: number) {
    const objective = await this.prismaService.objective.findUnique({
      where: { id },
    });
    if (!objective) {
      throw new ObjectiveNotFoundException(id);
    }
    return this.prismaService.objective.delete({
      where: { id },
    });
  }

  async getStatus(objectiveId: number) {
    const objective = await this.prismaService.objective.findUnique({
      where: { id: objectiveId },
      include: { keyResults: true },
    });
    if (!objective) {
      throw new ObjectiveNotFoundException(objectiveId);
    }
    return this.calculateCompleteness(objective.keyResults);
  }

  private calculateCompleteness(keyResults: KeyResult[]) {
    for (const keyResult of keyResults) {
      if (keyResult.progress < 100) {
        return false;
      }
    }
    return true;
  }

  async getById(id: number) {
    const objective = await this.prismaService.objective.findUnique({
      where: { id },
      include: { keyResults: true },
    });
    if (!objective) {
      throw new ObjectiveNotFoundException(id);
    }
    return objective;
  }
}

export default ObjectiveService;
