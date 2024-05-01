export interface ServiceInterface {
    getId(): string
    getName(): string
    getDescription(): string
    getCreatedAt(): Date
    getUpdatedAt(): Date
    getArchivedAt(): Date | null
    getDeletedAt(): Date | null
}
