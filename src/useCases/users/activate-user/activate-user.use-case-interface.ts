export interface ActivateUserUseCaseInterface {
  execute(id: string): Promise<void>
}
