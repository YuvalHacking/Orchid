import { Photo } from '@common/entities/photo.entity';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getExistingPhotoIds } from '../../utils/getExistingPhotoIds';
import { fetchPhotosFromApi } from '../../utils/fetchPhotosFromApi';
import { savePhotosInBatches } from '../../utils/savePhotosInBatches';
import { PHOTOS_BATCH_LOAD } from '../../consts/photo.consts';

@Injectable()
export class PhotoService implements OnModuleInit {
  private readonly logger = new Logger(PhotoService.name);

  private photosUrl: string;

  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private configService: ConfigService,
  ) {
    this.photosUrl = this.configService.get<string>('PHOTOS_URL');
  }

  async onModuleInit(): Promise<void> {
    await this.loadPhotosIntoDatabase(); // Load photos when the module initializes
  }

  private async loadPhotosIntoDatabase(): Promise<void> {
    this.logger.log('Please wait for the photos to load into the database...');

    try {
      const photos = await fetchPhotosFromApi(this.photosUrl);

      const existingPhotoIds = await getExistingPhotoIds(
        this.photoRepository,
        photos,
      );

      // Filter out photos that already exist in the database
      const newPhotos = photos.filter(
        (photo) => !existingPhotoIds.has(photo.id),
      );

      await savePhotosInBatches(
        this.photoRepository,
        newPhotos,
        PHOTOS_BATCH_LOAD,
      );

      this.logger.log('Photos loaded into the database.');
    } catch (error) {
      this.logger.error('Error loading photos:', error);
      throw new Error('Could not load photos into the database');
    }
  }

  findAllPhotos(): Promise<Photo[]> {
    return this.photoRepository
      .find() // Retrieve all photos
      .catch((error) => {
        this.logger.error('Error retrieving photos:', error);
        throw new Error('Could not retrieve photos');
      });
  }

  findPhotoByTitle(title: string): Promise<Photo> {
    return this.photoRepository
      .findOneBy({ title }) // Find a photo by title
      .catch((error) => {
        this.logger.error(`Error finding photo by title "${title}":`, error);
        throw new Error('Could not find the photo by the given title');
      });
  }
}
