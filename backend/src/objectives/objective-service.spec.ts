import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { ObjectiveService } from './objective.service';
import { PrismaService } from '../prisma.service';
import { ObjectiveAlreadyExistsException } from '../common/exceptions/objective-already-exists.exception';
import { ObjectiveNotFoundException } from '../common/exceptions/objective-not-found.exception';

describe('ObjectiveService', () => {
  let objectiveService: ObjectiveService;

  const mockPrismaService = {
    objective: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ObjectiveService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    objectiveService = module.get<ObjectiveService>(ObjectiveService);
    vi.clearAllMocks();
  });

  const getMockObjective = (progress: number[] = []) => ({
    id: 1,
    title: 'Objective 1',
    keyResults: progress.map((value, index) => ({
      id: index + 1,
      description: '',
      progress: value,
      objectiveId: 1,
    })),
  });

  describe('getAll', () => {
    it('should return all objectives', async () => {
      const objectives = [
        getMockObjective(),
        { ...getMockObjective(), id: 2, title: 'Objective 2' },
      ];

      mockPrismaService.objective.findMany.mockResolvedValue(objectives);

      const result = await objectiveService.getAll();

      expect(result).toEqual(objectives);
      expect(mockPrismaService.objective.findMany).toHaveBeenCalledWith({
        include: { keyResults: true },
      });
    });

    it('should return empty array when no objectives exist', async () => {
      mockPrismaService.objective.findMany.mockResolvedValue([]);

      const result = await objectiveService.getAll();

      expect(result).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return objective by id', async () => {
      const objective = getMockObjective();

      mockPrismaService.objective.findUnique.mockResolvedValue(objective);

      const result = await objectiveService.getById(1);

      expect(result).toBe(objective);
      expect(mockPrismaService.objective.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
        }),
      );
    });

    it('should throw ObjectiveNotFoundException when objective does not exist', async () => {
      mockPrismaService.objective.findUnique.mockResolvedValue(null);

      await expect(objectiveService.getById(1)).rejects.toThrow(
        ObjectiveNotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new objective when title is unique', async () => {
      const dto = { title: 'New Objective' };
      const createdObjective = { id: 1, ...dto, keyResults: [] };

      mockPrismaService.objective.findFirst.mockResolvedValue(null);
      mockPrismaService.objective.create.mockResolvedValue(createdObjective);

      const result = await objectiveService.create(dto);

      expect(result).toBe(createdObjective);
      expect(mockPrismaService.objective.findFirst).toHaveBeenCalledWith({
        where: {
          title: {
            equals: dto.title,
            mode: 'insensitive',
          },
        },
      });
      expect(mockPrismaService.objective.create).toHaveBeenCalledWith({
        data: dto,
      });
    });

    it('should throw ObjectiveAlreadyExistsException when title exists', async () => {
      const dto = { title: 'Existing Objective' };

      mockPrismaService.objective.findFirst.mockResolvedValue({
        id: 1,
        title: dto.title,
      });

      await expect(objectiveService.create(dto)).rejects.toThrow(
        ObjectiveAlreadyExistsException,
      );

      expect(mockPrismaService.objective.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing objective', async () => {
      const updateDto = { title: 'Updated Objective' };

      mockPrismaService.objective.findUnique.mockResolvedValue(
        getMockObjective(),
      );
      mockPrismaService.objective.update.mockResolvedValue({
        id: 1,
        ...updateDto,
        keyResults: [],
      });

      const result = await objectiveService.update(1, updateDto);

      expect(result.title).toBe(updateDto.title);
      expect(mockPrismaService.objective.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 1 },
        }),
      );
      expect(mockPrismaService.objective.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
    });

    it('should throw ObjectiveNotFoundException when objective does not exist', async () => {
      mockPrismaService.objective.findUnique.mockResolvedValue(null);

      await expect(
        objectiveService.update(1, { title: 'Updated Objective' }),
      ).rejects.toThrow(ObjectiveNotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete an existing objective', async () => {
      const objective = getMockObjective();

      mockPrismaService.objective.findUnique.mockResolvedValue(objective);
      mockPrismaService.objective.delete.mockResolvedValue(objective);

      const result = await objectiveService.delete(1);

      expect(result).toBe(objective);
      expect(mockPrismaService.objective.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw ObjectiveNotFoundException when objective does not exist', async () => {
      mockPrismaService.objective.findUnique.mockResolvedValue(null);

      await expect(objectiveService.delete(1)).rejects.toThrow(
        ObjectiveNotFoundException,
      );
    });
  });

  describe('getStatus', () => {
    it('should return false if any keyResult progress < 100', async () => {
      mockPrismaService.objective.findUnique.mockResolvedValue(
        getMockObjective([100, 40]),
      );

      const result = await objectiveService.getStatus(1);

      expect(result).toEqual({ isCompleted: false, progress: 70 });
    });

    it.each([
      { title: 'no key results', progress: [] },
      { title: 'all key results completed', progress: [100, 100] },
    ])('should return true when $title', async ({ progress }) => {
      mockPrismaService.objective.findUnique.mockResolvedValue(
        getMockObjective(progress),
      );

      const result = await objectiveService.getStatus(1);

      expect(result).toEqual({ isCompleted: true, progress: 100 });
    });

    it('should throw ObjectiveNotFoundException if objective not found', async () => {
      mockPrismaService.objective.findUnique.mockResolvedValue(null);

      await expect(objectiveService.getStatus(1)).rejects.toThrow(
        ObjectiveNotFoundException,
      );
    });
  });
});
