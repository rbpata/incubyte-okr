import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveService } from './objective.service';
import { PrismaService } from '../../prisma.service';
import { KeyResultService } from './key-result/key-result.service';

describe('ObjectiveService', () => {
    let objectiveService: ObjectiveService;

    const mockPrismaService = {
        objective: {
            findUnique: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ObjectiveService,
                KeyResultService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        objectiveService = module.get<ObjectiveService>(ObjectiveService);
    });

    describe('setObjectiveStatus', () => {
        const getMockObjective = (progress: number[], isCompleted: boolean) => {
            return {
                id: '1',
                title: '',
                isCompleted: isCompleted,
                keyResults: progress.map((progress, index) => {
                    return {
                        id: index,
                        description: '',
                        progress: progress,
                        isCompleted: progress === 100,
                        objectiveId: '1',
                    };
                }),
            };
        };
        it("should return the object with isCompleted false and progress equal to mean of key-results'\ progress", async () => {
            const progressList = [77, 50];
            mockPrismaService.objective.findUnique.mockResolvedValue(
                getMockObjective(progressList, false),
            );
            const result = await objectiveService.setObjectiveStatus('1');
            const expectedResult = {
                isCompleted: false,
                progress:
                    progressList.reduce((a, b) => a + b, 0) /
                    progressList.length,
            };
            expect(result).toEqual(expectedResult);
        });
        it.each([[[100, 100], []]])(
            'should return the object with isCompleted true and progress equal to 100',
            async (progress) => {
                mockPrismaService.objective.findUnique.mockResolvedValue(
                    getMockObjective(progress, true),
                );
                const result = await objectiveService.setObjectiveStatus('1');
                const expectedResult = {
                    isCompleted: true,
                    progress: 100,
                };
                expect(result).toEqual(expectedResult);
            },
        );
    });
});
