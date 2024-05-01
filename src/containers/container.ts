export class Container {
    private readonly container: Record<string, unknown>

    constructor() {
        this.container = {}
    }

    add(key: string, value: unknown): void {
        this.container[key] = value
    }

    get(key: string): unknown {
        return this.container[key]
    }
}
