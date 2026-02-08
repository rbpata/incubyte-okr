import { KeyResultsService } from './key-results.service';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';

describe('KeyResultsService', () => {
  let keyResultsService: KeyResultsService;

  const mockResolvedValue = [
    {
      id: 1,
      description: 'Test Key Result',
      progress: 50,
      objectiveId: 1,
    },
    {
      id: 2,
      description: 'Another Key Result',
      progress: 75,
      objectiveId: 1,
    },
    {
      id: 3,
      description: 'Third Key Result',
      progress: 20,
      objectiveId: 2,
    },
  ];

  const mockPrismaService = {
    keyResult: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      createMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        KeyResultsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    keyResultsService = await module.resolve(KeyResultsService);
  });

  describe('getAll', () => {
    it('returns all key results', async () => {
      mockPrismaService.keyResult.findMany.mockResolvedValue(mockResolvedValue);

      const result = await keyResultsService.getAll();

      expect(result).toBe(mockResolvedValue);
      expect(mockPrismaService.keyResult.findMany).toHaveBeenCalled();
    });
  });

  describe('getKeyResultById', () => {
    it('should return a key result', async () => {
      const id = 1;
      mockPrismaService.keyResult.findUnique.mockResolvedValue(
        mockResolvedValue[0],
      );

      const result = await keyResultsService.getKeyResultById(id);

      expect(result).toBe(mockResolvedValue[0]);
      expect(mockPrismaService.keyResult.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw an error when key result is not found', async () => {
      const id = 99;
      mockPrismaService.keyResult.findUnique.mockResolvedValue(null);
      const result = keyResultsService.getKeyResultById(id);
      await expect(result).rejects.toThrow(Error);
      expect(mockPrismaService.keyResult.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('getKeyResultByObjectiveId', () => {
    it('should return key results for a given objective ID', async () => {
      const objectiveId = 1;
      mockPrismaService.keyResult.findMany.mockResolvedValue(mockResolvedValue);

      const result =
        await keyResultsService.getKeyResultByObjectiveId(objectiveId);

      expect(result).toBe(mockResolvedValue);
      expect(mockPrismaService.keyResult.findMany).toHaveBeenCalledWith({
        where: { objectiveId },
      });
    });

    it('should throw an error when no key results are found for the objective ID', async () => {
      const objectiveId = 0;
      mockPrismaService.keyResult.findMany.mockResolvedValue(null);
      const result = keyResultsService.getKeyResultByObjectiveId(objectiveId);
      await expect(result).rejects.toThrow(Error);

      expect(mockPrismaService.keyResult.findMany).toHaveBeenCalledWith({
        where: { objectiveId },
      });
    });
  });

  describe('createMany', () => {
    it('should create multiple key results', async () => {
      const objectiveId = 1;
      const dtos = [
        { description: 'New Key Result 1', progress: 0 },
        { description: 'New Key Result 2', progress: 0 },
      ];

      mockPrismaService.keyResult.createMany.mockResolvedValue({
        count: dtos.length,
      });

      const result = await keyResultsService.create(objectiveId, dtos);

      expect(result).toEqual({ count: dtos.length });
      expect(mockPrismaService.keyResult.createMany).toHaveBeenCalledWith({
        data: dtos.map((dto) => ({
          description: dto.description,
          progress: Number(dto.progress),
          objectiveId,
        })),
      });
    });
  });
});
