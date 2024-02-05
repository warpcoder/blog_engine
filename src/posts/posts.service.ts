import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/CreatePost.dto';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    getAll() {
        return this.prisma.post.findMany();
    }

    // create( data: CreatePostDto, author: number) {
    //     return this.prisma.post.create({ data: { 
    //         title: data.title,
    //         content: data.content,
    //         author: { connect: { id: author } },
    //         createdAt: new Date(),
    //      } });
    // }
}