import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoResolver } from './photo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@common/entities/photo.entity';
import { User } from '@common/entities/user.entity';
import { PhotoController } from './photo.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User]), ConfigModule],

  providers: [PhotoResolver, PhotoService],
  controllers: [PhotoController],
  exports: [PhotoService],
})
export class PhotoModule {}
