import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Post as PrismaPost } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  getPosts() {
    return this.postsService.getAll();
  }

  @Post('create')
  createPost(@Body() data: CreatePostDto) {
    // return this.postsService.create(data);
    return data;
  }
}
