export interface UserInterface {
    getId(): string
    getName(): string
    getEmail(): string
    getPassword(): string
    getCreatedAt(): Date
    getUpdatedAt(): Date
    getArchivedAt(): Date | null
    getDeletedAt(): Date | null
}
