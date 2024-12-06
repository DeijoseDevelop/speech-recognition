export abstract class Params { }

export abstract class UseCaseNoParams<T> {
    public abstract call(): Promise<T>;
}

export abstract class UseCase<T, Params> {
    public abstract call({ params }: { params?: Params }): Promise<T>;
}

export class UseCaseException {
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}