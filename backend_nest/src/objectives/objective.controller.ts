import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import ObjectiveService from './objective.service';
import { type CreateObjectiveDto } from './dto/create-objective.dto';
import { type UpdateObjectiveDto } from './dto/update-objective.dto';
@Controller('objectives')
class ObjectiveController {
  constructor(readonly objectiveService: ObjectiveService) {}

  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }

  @Post('create')
  create(@Body() createObjectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(createObjectiveDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.objectiveService.update(Number(id), updateObjectiveDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.objectiveService.delete(Number(id));
  }

}

export default ObjectiveController;
