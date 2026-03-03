import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMailDto {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsString()
  folder?: string;
}