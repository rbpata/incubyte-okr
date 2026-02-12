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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { KeyResultsService } from './key-results.service';
import { CreateKeyResultDto } from './dto/create-key-result.dto';
import { UpdateKeyResultDto } from './dto/update-key-result.dto';
import { KeyResultProgressPipe } from '../common/pipes/key-result-progress.pipe';

@ApiTags('Key Results')
@Controller('okr/objectives/:objectiveId/key-results')
class KeyResultsController {
  constructor(private readonly keyResultsService: KeyResultsService) { }

  @Get(':id')
  @ApiOperation({
    summary: 'Get key result by ID',
    description: 'Retrieves a specific key result by its unique identifier'
  })
  @ApiParam({
    name: 'objectiveId',
    type: 'number',
    description: 'The ID of the parent objective',
    example: 1
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the key result',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the key result',
    schema: {
      example: {
        id: 1,
        description: 'Achieve 90% customer satisfaction score',
        progress: 65,
        objectiveId: 1,
        createdAt: '2026-02-12T10:00:00.000Z',
        updatedAt: '2026-02-12T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Key result not found'
  })
  getKeyResultById(@Param('id', ParseIntPipe) id: number) {
    return this.keyResultsService.getKeyResultById(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all key results for an objective',
    description: 'Retrieves all key results associated with a specific objective'
  })
  @ApiParam({
    name: 'objectiveId',
    type: 'number',
    description: 'The ID of the objective to get key results for',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all key results for the objective',
    schema: {
      example: [
        {
          id: 1,
          description: 'Achieve 90% customer satisfaction score',
          progress: 65,
          objectiveId: 1,
          createdAt: '2026-02-12T10:00:00.000Z',
          updatedAt: '2026-02-12T10:00:00.000Z'
        },
        {
          id: 2,
          description: 'Reduce response time to under 2 hours',
          progress: 80,
          objectiveId: 1,
          createdAt: '2026-02-12T10:00:00.000Z',
          updatedAt: '2026-02-12T10:00:00.000Z'
        }
      ]
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
  getKeyResultByObjectiveId(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
  ) {
    return this.keyResultsService.getKeyResultByObjectiveId(objectiveId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create key results for an objective',
    description: 'Creates one or more key results for a specific objective'
  })
  @ApiParam({
    name: 'objectiveId',
    type: 'number',
    description: 'The ID of the objective to create key results for',
    example: 1
  })
  @ApiBody({
    type: [CreateKeyResultDto],
    description: 'Array of key results to create',
    examples: {
      example1: {
        summary: 'Create multiple key results',
        value: [
          {
            description: 'Achieve 90% customer satisfaction score',
            progress: 0
          },
          {
            description: 'Reduce response time to under 2 hours',
            progress: 0
          }
        ]
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Key results successfully created',
    schema: {
      example: [
        {
          id: 1,
          description: 'Achieve 90% customer satisfaction score',
          progress: 0,
          objectiveId: 1,
          createdAt: '2026-02-12T10:00:00.000Z',
          updatedAt: '2026-02-12T10:00:00.000Z'
        },
        {
          id: 2,
          description: 'Reduce response time to under 2 hours',
          progress: 0,
          objectiveId: 1,
          createdAt: '2026-02-12T10:00:00.000Z',
          updatedAt: '2026-02-12T10:00:00.000Z'
        }
      ]
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
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
  @ApiOperation({
    summary: 'Update a key result',
    description: 'Updates an existing key result with new data, including progress tracking'
  })
  @ApiParam({
    name: 'objectiveId',
    type: 'number',
    description: 'The ID of the parent objective',
    example: 1
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the key result to update',
    example: 1
  })
  @ApiBody({
    type: UpdateKeyResultDto,
    description: 'Key result update data',
    examples: {
      example1: {
        summary: 'Update progress',
        value: {
          progress: 75
        }
      },
      example2: {
        summary: 'Update description and progress',
        value: {
          description: 'Achieve 95% customer satisfaction score',
          progress: 85
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Key result successfully updated',
    schema: {
      example: {
        id: 1,
        description: 'Achieve 95% customer satisfaction score',
        progress: 85,
        objectiveId: 1,
        createdAt: '2026-02-12T10:00:00.000Z',
        updatedAt: '2026-02-12T16:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Key result not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data (e.g., progress must be between 0-100)'
  })
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
  @ApiOperation({
    summary: 'Delete a key result',
    description: 'Permanently deletes a key result from an objective'
  })
  @ApiParam({
    name: 'objectiveId',
    type: 'number',
    description: 'The ID of the parent objective',
    example: 1
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the key result to delete',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Key result successfully deleted',
    schema: {
      example: {
        message: 'Key result deleted successfully'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Key result not found'
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.keyResultsService.delete(id);
  }
}

export default KeyResultsController;
