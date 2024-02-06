import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { EnvironmentVariables } from './environment-variables';
import { validateSync } from 'class-validator';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      validate: (rawConfig) => {
        const config = plainToInstance(EnvironmentVariables, rawConfig, {
          enableImplicitConversion: true,
        });

        const error = validateSync(config);
        if (error.length > 0) throw new Error(error.toString());

        return config;
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL', { infer: true }),
        entities: [config.get('DATABASE_ENTITIES', { infer: true })],
        synchronize: config.get('DATABASE_SYNCHRONIZE', { infer: true }),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
