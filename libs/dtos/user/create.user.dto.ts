import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  @Field()
  name: string;

  @IsString({ message: 'Email should be string' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsString()
  @Field()
  email: string;
}
