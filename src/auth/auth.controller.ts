import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignDto } from './dto/sign.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() data: SignDto) {
    return this.authService.signIn(data.username, data.password);
  }

  @Post('signup')
  signUp(@Body() data: SignDto) {
    return this.authService.signUp(data.username, data.password);
  }
}
