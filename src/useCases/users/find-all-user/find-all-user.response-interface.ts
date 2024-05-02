export interface UserResponse {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
}

export interface FindAllUserResponseInterface {
  data: UserResponse[] | []
}
