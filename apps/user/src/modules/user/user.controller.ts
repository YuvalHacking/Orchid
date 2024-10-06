import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserInput } from '@dtos/user/create.user.dto';
import { DeleteUserInput } from '@dtos/user/delete.user.dto';
import { GetUserInput } from '@dtos/user/get.user.dto';
import { UserService } from './user.service';
import { UserActions } from '@common/patterns/user.pattern';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get a user based on id - if no input, return all users
  @MessagePattern(UserActions.GET_USER)
  async findUserById(@Payload() userInput: GetUserInput) {
    if (userInput.id) {
      return this.userService.findUserByID(userInput.id);
    } else {
      return this.userService.findAllUsers();
    }
  }

  // Create a new user
  @MessagePattern(UserActions.CREATE_USER)
  handleUserCreate(@Payload() userInput: CreateUserInput) {
    if (this.userService.findUserByEmail(userInput.email))
      return 'User with this email already exists';

    return this.userService.createUser(userInput);
  }

  // Delete a user
  @MessagePattern(UserActions.DELETE_USER)
  handleUserDelete(@Payload() userInput: DeleteUserInput) {
    if (!this.userService.findUserByID(userInput.id))
      return 'No user with this ID exists';

    return this.userService.deleteUser(userInput.id);
  }
}
