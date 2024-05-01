export interface ArchiveUserUseCaseInterface {
    execute(id: string): Promise<void>
}
