import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Photo } from '@common/entities/photo.entity';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { User } from '@common/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    FavoritesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres', 
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT), 
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Photo, User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
