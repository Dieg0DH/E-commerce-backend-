import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signIn(credentials);
  }

  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
