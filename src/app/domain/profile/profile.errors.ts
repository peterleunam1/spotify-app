export class ProfileErrors extends Error {
    constructor(message: string, public status: number) {
        super(message);
    }
}