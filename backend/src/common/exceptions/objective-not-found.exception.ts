export class ObjectiveNotFoundException extends Error {
  constructor(objectiveId: number) {
    super(`Objective with ID ${objectiveId} not found.`);
    this.name = 'ObjectiveNotFoundException';
  }
}
