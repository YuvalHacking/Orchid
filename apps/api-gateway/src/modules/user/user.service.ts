import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from '@dtos/user/create.user.dto';
import { DeleteUserInput } from '@dtos/user/delete.user.dto';
import { GetUserInput } from '@dtos/user/get.user.dto';
import { UserActions } from '@common/patterns/user.pattern';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  // Create a new user
  createUser(userInput: CreateUserInput) {
    return this.userClient.send({ cmd: UserActions.CREATE_USER }, userInput);
  }

  // Delete a user
  deleteUser(userInput: DeleteUserInput) {
    return this.userClient.send({ cmd: UserActions.DELETE_USER }, userInput);
  }

  // Get user details - if no input, return all users
  getUser(userInput: GetUserInput) {
    return this.userClient.send({ cmd: UserActions.GET_USER }, userInput);
  }
}
