import { Controller, Get, Post, Body } from '@nestjs/common';
import ObjectiveService from './objective.service';
import { type ObjectiveDto } from './dto/objective.dto';

@Controller('objectives')
class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}
  @Get()
  getObjectives() {
    return this.objectiveService.getObjectives();
  }

  @Get('/all')
  getAll() {
    return this.objectiveService.getALl();
  }
  @Post('create')
  create(@Body() createObjectiveDto: ObjectiveDto): any {
    return this.objectiveService.create(createObjectiveDto);
  }
}

export default ObjectiveController;
