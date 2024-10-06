import {
  Controller,
  Post,
  Delete,
  Get,
  NotFoundException,
  HttpCode,
  Param,
  Logger,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { GetFavoritesInput } from '@dtos/favorites/get.favorite.dto';
import { AddFavoriteInput } from '@dtos/favorites/add.favorite.dto';
import { DeleteFavoriteInput } from '@dtos/favorites/delete.favorite.dto';
import { GetTopFavoritesInput } from '@dtos/favorites/get-top.favorite.dto';
import { TOP_FAVORITIES_LIMIT } from 'apps/favorites/src/consts/favorites.consts';

// Controller for managing user favorites
@Controller('favorites/photos')
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);
  constructor(private readonly favoritesService: FavoritesService) {}

  // Get all favorite photos for a user
  @Get(':userId')
  async getFavoritePhotos(@Param('userId') userId: string) {
    const userInput: GetFavoritesInput = { userId };

    try {
      const favoritePhotos =
        await this.favoritesService.getFavoritePhotos(userInput);
      this.logger.log(`Retrieved favorite photos for user ${userId}.`);
      return favoritePhotos;
    } catch (error) {
      this.logger.error(
        `Error retrieving favorite photos for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  // Add a photo to the user's favorites
  @Post(':userId/:photoId')
  async addFavoritePhoto(
    @Param('userId') userId: string,
    @Param('photoId') photoId: string,
  ) {
    const userInput: AddFavoriteInput = { userId, photoId };

    try {
      const favoritePhoto =
        await this.favoritesService.addFavoritePhoto(userInput);

      if (!favoritePhoto) {
        this.logger.warn(
          `Photo not found for user ${userId} with photo ID ${photoId}`,
        );
        throw new NotFoundException('Photo not found');
      }

      this.logger.log(
        `Photo ID ${photoId} added to user ${userId}'s favorites.`,
      );
      return favoritePhoto;
    } catch (error) {
      this.logger.error(
        `Error adding favorite photo for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  // Remove a photo from the user's favorites
  @Delete(':userId/:photoId')
  @HttpCode(204)
  async removeFavoritePhoto(
    @Param('userId') userId: string,
    @Param('photoId') photoId: string,
  ): Promise<void> {
    const userInput: DeleteFavoriteInput = { userId, photoId };

    try {
      const success =
        await this.favoritesService.removeFavoritePhoto(userInput);
      if (!success) {
        this.logger.warn(
          `Favorite photo not found for user ${userId} with photo ID ${photoId}`,
        );
        throw new NotFoundException('Favorite photo not found');
      }

      this.logger.log(
        `Photo ID ${photoId} removed from user ${userId}'s favorites.`,
      );
    } catch (error) {
      this.logger.error(
        `Error removing favorite photo for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  // Get top favorited photos
  @Get('top/:limit?')
  async getTopPhotos(@Param('limit') limit?: string) {
    const userInput: GetTopFavoritesInput = {
      limit: parseInt(limit, 10) || TOP_FAVORITIES_LIMIT,
    };

    try {
      const topPhotos =
        await this.favoritesService.getTopFavoritedPhotos(userInput);
      this.logger.log(
        `Retrieved top favorited photos with limit ${userInput.limit}.`,
      );
      return topPhotos;
    } catch (error) {
      this.logger.error('Error retrieving top favorited photos:', error);
      throw error;
    }
  }
}
