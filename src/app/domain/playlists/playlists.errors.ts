export class PlaylistsError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
