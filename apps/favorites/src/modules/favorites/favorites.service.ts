import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@common/entities/user.entity';
import { Photo } from '@common/entities/photo.entity';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger('FavoritesService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  // Add a photo to user's favorites
  async addFavoritePhoto(userId: string, photoId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoritePhotos'],
      });
      const photo = await this.photoRepository.findOne({
        where: { id: photoId },
      });

      if (user && photo) {
        user.favoritePhotos.push(photo); // Add photo to user's favorites
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(
          `Photo with ID ${photoId} added to user ${userId}'s favorites`,
        );
        return updatedUser;
      }
      this.logger.error('User or Photo not found');
      throw new NotFoundException('User or Photo not found');
    } catch (error) {
      this.logger.error('Error adding favorite photo:', error);
      throw error;
    }
  }

  // Remove a photo from user's favorites
  async removeFavoritePhoto(userId: string, photoId: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoritePhotos'],
      });

      if (user) {
        user.favoritePhotos = user.favoritePhotos.filter(
          (photo) => photo.id !== photoId, // Filter out the photo to be removed
        );
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(
          `Photo with ID ${photoId} removed from user ${userId}'s favorites`,
        );
        return updatedUser;
      }
      this.logger.error('User not found');
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error('Error removing favorite photo:', error);
      throw error;
    }
  }

  // Retrieve user's favorite photos
  async findFavoritePhotos(userId: string): Promise<Photo[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoritePhotos'],
      });
      if (user) {
        this.logger.log(`Retrieved favorite photos for user ${userId}`);
        return user.favoritePhotos;
      }
      this.logger.error('User not found');
      throw new NotFoundException('User not found');
    } catch (error) {
      this.logger.error('Error retrieving favorite photos:', error);
      throw error;
    }
  }

  // Find top favorited photos limited by the specified count
  async findTopFavoritedPhotos(limit: number): Promise<Photo[]> {
    try {
      const topPhotos = await this.photoRepository
        .createQueryBuilder('photo')
        .leftJoinAndSelect('photo.favoritedBy', 'user')
        .groupBy('photo.id')
        .orderBy('COUNT(user.id)', 'DESC')
        .limit(limit)
        .getMany();

      this.logger.log(`Retrieved top ${limit} favorited photos`);
      return topPhotos;
    } catch (error) {
      this.logger.error('Error retrieving top favorited photos:', error);
      throw error;
    }
  }
}
