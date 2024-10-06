import { Field, ObjectType } from '@nestjs/graphql';
import { Photo } from '@common/entities/photo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique(['email'])
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Field(() => [Photo], { nullable: true })
  @ManyToMany(() => Photo, (photo) => photo.favoritedBy, { eager: true })
  @JoinTable()
  favoritePhotos: Photo[];
}
