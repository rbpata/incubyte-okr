import { Controller, Get, Post, Body } from '@nestjs/common';
import ObjectiveService from './objective.service';
import { type ObjectiveDto } from './dto/objective.dto';
@Controller('objectives')
class ObjectiveController {
  constructor(readonly objectiveService: ObjectiveService) {}

  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }

  @Post('create')
  create(@Body() createObjectiveDto: ObjectiveDto) {
    return this.objectiveService.create(createObjectiveDto);
  }

}

export default ObjectiveController;
