import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';
import { KeyResultProgressPipe } from '../common/pipes/key-result-progress.pipe';

@Controller('okr/objectives/:objectiveId/key-results')
class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Get(':id')
  getKeyResultById(@Param('id', ParseIntPipe) id: number) {
    return this.keyResultsService.getKeyResultById(id);
  }

  @Get()
  getKeyResultByObjectiveId(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
  ) {
    return this.keyResultsService.getKeyResultByObjectiveId(objectiveId);
  }

  @Post()
  create(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Body(
      new ParseArrayPipe({
        items: CreateKeyResultDto,
      }),
    )
    createKeyResultDtos: CreateKeyResultDto[],
  ) {
    return this.keyResultsService.create(objectiveId, createKeyResultDtos);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateKeyResultDto: UpdateKeyResultDto,
    @Body('progress', KeyResultProgressPipe) progress?: number,
  ) {
    return this.keyResultsService.update(id, {
      ...updateKeyResultDto,
      progress,
    });
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.keyResultsService.delete(id);
  }
}

export default KeyResultsController;
