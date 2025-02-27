export class AlbumsErrors extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
