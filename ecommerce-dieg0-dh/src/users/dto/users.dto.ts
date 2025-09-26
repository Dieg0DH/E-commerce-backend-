// import { PickType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/helpers/matchPassword';

export class CreateUserDto {
  /**
   * @description This is the name of the user
   * @example 'Mark Zans'
   */
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * @description This is the email of the user
   * @example 'mark@gmail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description This is the password of the user
   * @example 'Mark123!'
   */
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    },
  )
  @Length(8, 15)
  password: string;

  /**
   * @description This is the confirm password of the user
   * @example 'Mark123!'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * @description This is the address of the user
   * @example '123 Mockingbird Lane ,Apt #4B,Testville, CA 90210'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * @description This is the phone number of the user
   * @example 5550123456
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @description This is the city of the user
   * @example 'Testville'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  /**
   * @description This is the country of the user
   * @example 'Republic of Eldoria'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'password',
  'email',
]) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
