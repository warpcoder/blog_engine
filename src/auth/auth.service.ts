import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/environment-variables';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentVariables, true>,
  ) {}

  async getUser(username: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    return user;
  }

  async signUp(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (user) throw new NotAcceptableException();

    const newUser = await this.usersService.create(username, password);
    return newUser;
  }

  async signIn(username: string, password: string): Promise<string> {
    if (!username || !password) throw new NotAcceptableException();

    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, username: user.username },
      { expiresIn: this.configService.get('JWT_EXPIRES_IN', { infer: true }) },
    );
    return accessToken;
  }
}
