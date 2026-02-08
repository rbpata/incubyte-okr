import {
  Body,
  Controller,
  Delete,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from './dto/create-key-result.dto';

@Controller('okr/objectives/:objectiveId/key-results')
class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) {}

  @Get(':id')
  getKeyResultById(@Param('id') id: number) {
    return this.keyResultsService.getKeyResultById(Number(id));
  }
  @Get()
  getKeyResultByObjectiveId(@Param('objectiveId') objectiveId: number) {
    return this.keyResultsService.getKeyResultByObjectiveId(
      Number(objectiveId),
    );
  }

  @Post()
  async create(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Body(new ParseArrayPipe({ items: CreateKeyResultDto }))
    createKeyResultDto: CreateKeyResultDto[],
  ) {
    return this.keyResultsService.create(objectiveId, createKeyResultDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateKeyResultDto: CreateKeyResultDto,
  ) {
    return this.keyResultsService.update(Number(id), updateKeyResultDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.keyResultsService.delete(Number(id));
  }
}

export default KeyResultsController;
