import { PasswordService } from '@/services/password-service'
import { ContainerInterface } from './container.interface'
import { ContainerWrapperInterface } from './container-wrapper.interface'

export class ServiceContainer implements ContainerInterface {
    constructor(private container: ContainerWrapperInterface) {}

    public register(): void {
        const passwordService = new PasswordService()

        this.container.add('PasswordService', passwordService)
    }
}
