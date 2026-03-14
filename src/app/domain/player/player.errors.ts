export class PlayerError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
