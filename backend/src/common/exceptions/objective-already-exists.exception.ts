export class ObjectiveAlreadyExistsException extends Error {
  constructor(objectiveName: string) {
    super(
      `An objective with the name - ${objectiveName} - already exists. Duplicate objectives are not allowed.`,
    );
    this.name = `An objective with the name - ${objectiveName} - already exists. Duplicate objectives are not allowed.`;
  }
}
