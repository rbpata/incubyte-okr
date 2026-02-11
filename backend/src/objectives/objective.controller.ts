import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { type CreateObjectiveDto } from './dto/create-objective.dto';
import { type UpdateObjectiveDto } from './dto/update-objective.dto';

@Controller('okr/objectives')
class ObjectiveController {
  constructor(readonly objectiveService: ObjectiveService) {}

  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.getById(id);
  }

  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    const objectiveId = parseInt(id, 10);
    return this.objectiveService.getStatus(objectiveId);
  }

  @Post()
  create(@Body() createObjectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(createObjectiveDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.objectiveService.update(id, updateObjectiveDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.delete(id);
  }
}

export default ObjectiveController;
