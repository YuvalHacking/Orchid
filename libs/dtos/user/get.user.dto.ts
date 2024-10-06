import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class GetUserInput {
  @IsString({ message: 'ID should be a string' })
  @IsNotEmpty({ message: 'ID should not be empty' })
  @Field()
  id: string;
}
