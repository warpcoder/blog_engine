import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


export type User = {
    id: number;
    username: string;
    password: string;
};

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(username: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { username } });
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async create(data: SignInDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const result = {
            ...data,
            password: hashedPassword,
        }
        return this.prisma.user.create({ data: result });
    }
}
