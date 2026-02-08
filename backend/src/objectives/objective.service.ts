import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import { DuplicateObjectiveNotAllowedException } from '../common/exceptions/objective-not-allowed.exception';

@Injectable()
class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}
  getAll() {
    return this.prismaService.objective.findMany({
      include: { keyResults: true },
    });
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
      throw new DuplicateObjectiveNotAllowedException(createObjectiveDto.title);
    }
  }

  update(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    return this.prismaService.objective.update({
      where: { id },
      data: updateObjectiveDto,
    });
  }

  delete(id: number) {
    return this.prismaService.objective.delete({
      where: { id },
    });
  }
}

export default ObjectiveService;
