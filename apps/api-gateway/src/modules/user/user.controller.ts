import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  NotFoundException,
  Post,
  HttpCode,
  Logger,
} from '@nestjs/common';
import { CreateUserInput } from '@dtos/user/create.user.dto';
import { DeleteUserInput } from '@dtos/user/delete.user.dto';
import { GetUserInput } from '@dtos/user/get.user.dto';
import { UserService } from './user.service';

// Controller for managing user actions
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post() // Create a new user
  async createUser(@Body() userInput: CreateUserInput) {
    try {
      const createdUser = await this.userService.createUser(userInput);
      if (!createdUser) {
        this.logger.warn('User could not be created');
        throw new NotFoundException('User could not be created');
      }
      this.logger.log('User created successfully');
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw error;
    }
  }

  @Delete(':id') // Delete a user by ID
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    try {
      const userInput: DeleteUserInput = { id };
      const success = await this.userService.deleteUser(userInput);
      if (!success) {
        this.logger.warn(`User not found for ID: ${id}`);
        throw new NotFoundException('User not found');
      }
      this.logger.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }

  @Get(':id') // Get user details by ID
  async getUser(@Param('id') id: string) {
    try {
      const userInput: GetUserInput = { id };
      const user = await this.userService.getUser(userInput);
      if (!user) {
        this.logger.warn(`User not found for ID: ${id}`);
        throw new NotFoundException('User not found');
      }
      this.logger.log(`User retrieved successfully for ID: ${id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error retrieving user with ID ${id}:`, error);
      throw error;
    }
  }
}
