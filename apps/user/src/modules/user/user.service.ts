import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '@dtos/user/create.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@common/entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(userInput: CreateUserInput): Promise<User> {
    try {
      const newUser = this.userRepository.create(userInput);
      const savedUser = await this.userRepository.save(newUser);
      this.logger.log(`User created with ID: ${savedUser.id}`);
      return savedUser;
    } catch (error) {
      this.logger.error('Error creating user:', error);
      throw error;
    }
  }

  // Find a user by ID
  async findUserByID(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        this.logger.error(`User not found with ID: ${id}`);
        throw new NotFoundException('User not found');
      }
      this.logger.log(`User retrieved with ID: ${id}`);
      return user;
    } catch (error) {
      this.logger.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        this.logger.error(`User not found with email: ${email}`);
        throw new NotFoundException('User not found');
      }
      this.logger.log(`User retrieved with email: ${email}`);
      return user;
    } catch (error) {
      this.logger.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Find all users
  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      this.logger.log(`Retrieved ${users.length} users`);
      return users;
    } catch (error) {
      this.logger.error('Error finding all users:', error);
      throw error;
    }
  }

  // Delete a user by ID
  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.delete({ id });
      if (result.affected > 0) {
        this.logger.log(`User deleted with ID: ${id}`);
        return true;
      }
      this.logger.error(`User not found with ID: ${id}`);
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error('Error deleting user:', error);
      throw error;
    }
  }
}
