import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import ObjectiveService from './objective.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';
import {
  HttpExceptionFilter,
  ObjectiveNotAllowedException,
} from '../common/filters/http-exception.filter';
import { ObjectiveTitlePipe } from '../common/pipes/objective-title.pipe';

@UseFilters(HttpExceptionFilter, ObjectiveNotAllowedException)
@Controller('okr/objectives')
class ObjectiveController {
  constructor(readonly objectiveService: ObjectiveService) {}

  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }

  @Post()
  create(@Body(ObjectiveTitlePipe) title: string) {
    return this.objectiveService.create({ title });
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
