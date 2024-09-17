import { Transform } from 'class-transformer'
import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsInt, IsEnum } from 'class-validator'
import { Gender } from '@/common/enums/gender.enum'
import { Goal } from '@/common/enums/goal.enum'
import { ActivityLevel } from '@/common/enums/activity-level.enum'

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
  @IsString()
  role?: string

  @IsOptional()
  @IsString()
  deletedAt?: string

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
  @IsEnum(Gender)
  gender?: Gender

  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal

  @IsOptional()
  @IsEnum(ActivityLevel)
  activityLevel?: ActivityLevel
}
