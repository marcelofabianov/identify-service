export interface ArchiveUserRepositoryInterface {
    archive: (id: string) => Promise<void>
}
