import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import ObjectiveController from './objective.controller';
import ObjectiveService from './objective.service';

describe('ObjectiveController', () => {
  let objectiveController: ObjectiveController;

  const mockObjectiveService = {
    getAll: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ObjectiveController],
      providers: [
        {
          provide: ObjectiveService,
          useValue: mockObjectiveService,
        },
      ],
    }).compile();

    objectiveController = module.get<ObjectiveController>(ObjectiveController);

    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all objectives', async () => {
      const mockObjectives = [
        {
          id: 1,
          title: 'Objective 1',
          keyResults: [],
        },
        {
          id: 2,
          title: 'Objective 2',
          keyResults: [],
        },
      ];

      mockObjectiveService.getAll.mockResolvedValue(mockObjectives);

      const result = await objectiveController.getAll();

      expect(result).toEqual(mockObjectives);
      expect(mockObjectiveService.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
