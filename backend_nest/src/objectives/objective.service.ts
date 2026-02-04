import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@Injectable()
class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}
  getAll() {
    return this.prismaService.objective.findMany();
  }

  create(createObjectiveDto: CreateObjectiveDto) {
    return this.prismaService.objective.create({
      data: createObjectiveDto,
    });
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
