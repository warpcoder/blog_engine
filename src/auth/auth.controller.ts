import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Post('signup')
  signUp(@Body() signInDto: SignInDto) {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }
}
