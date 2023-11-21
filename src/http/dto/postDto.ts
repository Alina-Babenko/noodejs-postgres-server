import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Post } from "../../database/entities/Post";
import { IsUnique } from "../validators/IsUniqueValidator";

export class CreatePostDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Post, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdatePostDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsUnique(Post, "title")
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;
}
