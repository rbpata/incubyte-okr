import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectiveService } from './objective.service';
import { CreateObjectiveDto, UpdateObjectiveDto } from './dto/objective.dto';

@Controller('v3/objective')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}
  @Get()
  getAll() {
    return this.objectiveService.getAll();
  }
  @Get(':id')
  getOneById(@Param('id') id: string) {
    return this.objectiveService.getOneById(id);
  }

  @Post()
  create(@Body() createObjectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(createObjectiveDto);
  }

  @Put('/')
  update(@Body() updateObjectiveDto: UpdateObjectiveDto) {
    return this.objectiveService.update(updateObjectiveDto);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.objectiveService.delete(id);
  }
}
