import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetPhotoInput {
  @IsString({ message: 'Title should be string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @Length(1, 30, { message: 'Title must be between 1 and 30 characters' })
  @Field()
  title: string;
}
