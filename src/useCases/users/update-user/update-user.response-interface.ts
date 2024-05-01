export interface UpdateUserResponseInterface {
    id: string
    name: string
    email: string
    role: string
    createdAt: Date
    updatedAt: Date
    archivedAt: Date | null
}
