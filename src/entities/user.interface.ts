export interface UserInterface {
    getId(): string
    getName(): string
    getEmail(): string
    getPassword(): string
    getCreatedAt(): Date
    getUpdatedAt(): Date
    getDeletedAt(): Date | null
    getArchivedAt(): Date | null
}
