import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '@common/entities/user.entity';

@Entity()
@ObjectType()
export class Photo {
  @Field(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  url: string;

  @Field(() => String)
  @Column()
  thumbnailUrl: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.favoritePhotos)
  favoritedBy: User[];
}
