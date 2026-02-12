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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import ObjectiveService from './objective.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@ApiTags('Objectives')
@Controller('okr/objectives')
class ObjectiveController {
  constructor(readonly objectiveService: ObjectiveService) { }

  @Get()
  @ApiOperation({
    summary: 'Get all objectives',
    description: 'Retrieves a list of all objectives in the system'
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all objectives',
    schema: {
      example: [
        {
          id: 1,
          title: 'Increase customer satisfaction',
          createdAt: '2026-02-12T10:00:00.000Z',
          updatedAt: '2026-02-12T10:00:00.000Z'
        }
      ]
    }
  })
  getAll() {
    return this.objectiveService.getAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get objective by ID',
    description: 'Retrieves a specific objective by its unique identifier'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the objective',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the objective',
    schema: {
      example: {
        id: 1,
        title: 'Increase customer satisfaction',
        createdAt: '2026-02-12T10:00:00.000Z',
        updatedAt: '2026-02-12T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.getById(id);
  }

  @Get(':id/status')
  @ApiOperation({
    summary: 'Get objective status',
    description: 'Retrieves the current status and progress of an objective based on its key results'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the objective',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved objective status',
    schema: {
      example: {
        objectiveId: 1,
        overallProgress: 65,
        keyResultsCount: 3,
        completedKeyResults: 1
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
  getStatus(@Param('id') id: string) {
    const objectiveId = parseInt(id, 10);
    return this.objectiveService.getStatus(objectiveId);

  }

  @Post()
  @ApiOperation({
    summary: 'Create a new objective',
    description: 'Creates a new objective with the provided title'
  })
  @ApiBody({
    type: CreateObjectiveDto,
    description: 'Objective creation data',
    examples: {
      example1: {
        summary: 'Sample objective',
        value: {
          title: 'Increase customer satisfaction by 20%'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Objective successfully created',
    schema: {
      example: {
        id: 1,
        title: 'Increase customer satisfaction by 20%',
        createdAt: '2026-02-12T10:00:00.000Z',
        updatedAt: '2026-02-12T10:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  create(
    @Body() createObjectiveDto: CreateObjectiveDto,
  ) {
    return this.objectiveService.create(createObjectiveDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an objective',
    description: 'Updates an existing objective with new data'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the objective to update',
    example: 1
  })
  @ApiBody({
    type: UpdateObjectiveDto,
    description: 'Objective update data',
    examples: {
      example1: {
        summary: 'Update objective title',
        value: {
          title: 'Increase customer satisfaction by 30%'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Objective successfully updated',
    schema: {
      example: {
        id: 1,
        title: 'Increase customer satisfaction by 30%',
        createdAt: '2026-02-12T10:00:00.000Z',
        updatedAt: '2026-02-12T16:00:00.000Z'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data'
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateObjectiveDto: UpdateObjectiveDto,
  ) {
    return this.objectiveService.update(id, updateObjectiveDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an objective',
    description: 'Permanently deletes an objective and all its associated key results'
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the objective to delete',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Objective successfully deleted',
    schema: {
      example: {
        message: 'Objective deleted successfully'
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Objective not found'
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.delete(id);
  }
}

export default ObjectiveController;
