import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FavoritesService } from './favorites.service';
import { GetFavoritesInput } from '@dtos/favorites/get.favorite.dto';
import { AddFavoriteInput } from '@dtos/favorites/add.favorite.dto';
import { DeleteFavoriteInput } from '@dtos/favorites/delete.favorite.dto';
import { GetTopFavoritesInput } from '@dtos/favorites/get-top.favorite.dto';
import { FavoritePhotoActions } from '@common/patterns/favorites.pattern';

// Controller for managing user favorites (photos, etc.)
@Controller()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // Get user's favorite photos
  @MessagePattern({ cmd: FavoritePhotoActions.GET_FAVORITE_PHOTOS })
  findFavoritePhotos(userInput: GetFavoritesInput) {
    return this.favoritesService.findFavoritePhotos(userInput.userId);
  }

  // Add a photo to user's favorites
  @MessagePattern({ cmd: FavoritePhotoActions.ADD_FAVORITE_PHOTO })
  addFavoritePhoto(userInput: AddFavoriteInput) {
    return this.favoritesService.addFavoritePhoto(
      userInput.userId,
      userInput.photoId,
    );
  }

  // Remove a photo from user's favorites
  @MessagePattern({ cmd: FavoritePhotoActions.REMOVE_FAVORITE_PHOTO })
  removeFavoritePhoto(userInput: DeleteFavoriteInput) {
    return this.favoritesService.removeFavoritePhoto(
      userInput.userId,
      userInput.photoId,
    );
  }

  // Get top favorited photos limited by user input
  @MessagePattern({ cmd: FavoritePhotoActions.FIND_TOP_FAVORITED_PHOTOS })
  findTopFavoritedPhotos(userInput: GetTopFavoritesInput) {
    return this.favoritesService.findTopFavoritedPhotos(userInput.limit);
  }
}
