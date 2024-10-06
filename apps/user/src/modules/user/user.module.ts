import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './user.controller';
import { User } from '@common/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@common/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Photo])],
  providers: [UserResolver, UserService],
  controllers: [UserController],
})
export class UserModule {}
