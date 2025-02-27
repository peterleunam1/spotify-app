export class TracksErrors extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
