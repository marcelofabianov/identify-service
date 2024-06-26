import { FastifyInstance } from 'fastify'

import { ControllerInterface } from '../controller.interface'
import { RouterInterface } from '../router.interface'
import { UserUriEnum } from './user-uri.enum'

export class UserRouter implements RouterInterface {
  constructor(
    private createUserController: ControllerInterface,
    private findUserController: ControllerInterface,
    private findAllUserController: ControllerInterface,
    private deleteUserController: ControllerInterface,
    private updateUserController: ControllerInterface,
    private archiveUserController: ControllerInterface,
    private activateUserController: ControllerInterface,
    private changePasswordController: ControllerInterface,
  ) {}

  public register = (
    fastify: FastifyInstance,
    _: unknown,
    done: () => void,
  ): void => {
    fastify.post(UserUriEnum.CREATE_USER, (req, reply) =>
      this.createUserController.handle(req, reply),
    )
    fastify.get(UserUriEnum.FIND_USER, (req, reply) =>
      this.findUserController.handle(req, reply),
    )
    fastify.get(UserUriEnum.FIND_ALL_USER, (req, reply) =>
      this.findAllUserController.handle(req, reply),
    )
    fastify.delete(UserUriEnum.DELETE_USER, (req, reply) =>
      this.deleteUserController.handle(req, reply),
    )
    fastify.put(UserUriEnum.UPDATE_USER, (req, reply) =>
      this.updateUserController.handle(req, reply),
    )
    fastify.patch(UserUriEnum.ARCHIVE_USER, (req, reply) =>
      this.archiveUserController.handle(req, reply),
    )
    fastify.patch(UserUriEnum.ACTIVATE_USER, (req, reply) =>
      this.activateUserController.handle(req, reply),
    )
    fastify.patch(UserUriEnum.CHANGE_PASSWORD, (req, reply) =>
      this.changePasswordController.handle(req, reply),
    )

    done()
  }
}
