import axios from 'axios';
import { Logger } from '@nestjs/common';

const logger = new Logger('PhotoService');

export const fetchPhotosFromApi = async (photosUrl: string) => {
  try {
    const { data: photos } = await axios.get(photosUrl);
    logger.log(`Successfully fetched ${photos.length} photos from API`);
    return photos;
  } catch (error) {
    logger.error('Error fetching photos from API:', error);
    throw new Error('Error fetching photos from API');
  }
};
