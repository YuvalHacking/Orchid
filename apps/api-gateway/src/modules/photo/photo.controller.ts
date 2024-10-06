import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { GetPhotoInput } from '@dtos/photo/get.photo.dto';

// Controller for managing photos
@Controller('photos')
export class PhotoController {
  private readonly logger = new Logger(PhotoController.name);

  constructor(private readonly photoService: PhotoService) {}

  @Get(':title') // Get a photo based on title
  async getPhoto(@Param('title') title: string) {
    const userInput: GetPhotoInput = { title };

    try {
      const photo = await this.photoService.getPhoto(userInput);

      // Check if the photo was found
      if (!photo) {
        this.logger.warn(`Photo not found for title: ${title}`);
        throw new NotFoundException('Photo not found');
      }

      this.logger.log(`Photo retrieved successfully for title: ${title}`);
      return photo;
    } catch (error) {
      this.logger.error(`Error retrieving photo for title: ${title}:`, error);
      throw error;
    }
  }
}
