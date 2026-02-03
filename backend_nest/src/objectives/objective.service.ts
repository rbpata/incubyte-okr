import { Injectable, Body } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ObjectiveDto } from './dto/objective.dto';
@Injectable()
class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}
  getAll() {
    return this.prismaService.objective.findMany();
  }

  create(createObjectiveDto: ObjectiveDto) {
    const createdObjective = this.prismaService.objective.create({
      data: createObjectiveDto,
    });
    return createdObjective;
  }
}

export default ObjectiveService;
