import { Transform } from 'class-transformer'
import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsInt } from 'class-validator'

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string

  @IsEmail()
  email: string

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string

  @IsOptional()
  @IsNumber()
  height?: number

  @IsOptional()
  @IsNumber()
  weight?: number

  @IsOptional()
  @IsInt()
  age?: number

  @IsOptional()
  @IsString()
  activityLevel?: string

  @IsOptional()
  @IsString()
  goal?: string
}
