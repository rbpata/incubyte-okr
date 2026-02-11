export class KeyResultNotAllowedException extends Error {
  constructor() {
    super('You are not allowed to perform this action on the key result');
    this.name = 'You are not allowed to perform this action on the key result';
  }
}
