import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService
        ) {}

    async signIn(username: string, pass: string): Promise<string> {
        const user = await this.usersService.findOne(username);
        if (!user || !await bcrypt.compare(pass, user.password)) throw new UnauthorizedException();
        const accessToken = await this.jwtService.signAsync({ sub: user.id, username: user.username });
        return accessToken;
    }
    
    async signUp(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(username);
        if (user) throw new UnauthorizedException();
        const newUser = await this.usersService.create({ username, password: pass });
        return newUser;
    }

    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    getUserIdFromToken(token: string): number {
        const decoded = this.jwtService.decode(token) as { sub: number }; // Decode the JWT token and cast the result to include 'sub' as number
        return decoded.sub; // Retrieve the user id from the 'sub' claim in the JWT payload
    }
}