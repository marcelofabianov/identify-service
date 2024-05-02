export interface CreateUserPasswordServiceInterface {
  hashPassword(password: string): Promise<string>
}
