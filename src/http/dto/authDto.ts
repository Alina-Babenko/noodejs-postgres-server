import { User } from "../../database/entities/User";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique(User, "email")
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
