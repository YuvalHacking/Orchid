import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@common/entities/photo.entity';
import { User } from '@common/entities/user.entity';
import { FavoritesController } from './favorites.controller';

// Module for managing user favorites (photos, etc.)
@Module({
  imports: [TypeOrmModule.forFeature([Photo, User])],
  providers: [FavoritesResolver, FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
