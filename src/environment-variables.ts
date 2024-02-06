import { IsInt, IsString } from "class-validator";

export class EnvironmentVariables {
    @IsString()
    DATABASE_URL: string;

    @IsString()
    DATABASE_ENTITIES: string;

    @IsString()
    DATABASE_MIGRATIONS: string;

    @IsString()
    DATABASE_SYNCHRONIZE: string;

    @IsInt()
    PORT: number;

    @IsString()
    JWT_SECRET: string;

    @IsString()
    JWT_EXPIRES_IN: string;
}