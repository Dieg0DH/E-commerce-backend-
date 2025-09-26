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
   * @description Este es el nombre del usuario
   * @example 'Pepito Perez'
   */
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * @description Este es el email del usuario
   * @example 'pepito@gmail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description Este es el password del usuario
   * @example 'Pepito123!'
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
   * @description Este es el confirm password del usuario
   * @example 'Pepito123!'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * @description Este es el address del usuario
   * @example '123 Mockingbird Lane ,Apt #4B,Testville, CA 90210'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * @description Este es el phone number del usuario
   * @example 5550123456
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @description Este es el city del usuario
   * @example 'Testville'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  /**
   * @description Este es el country del usuario
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
