import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthDto {
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(150)
	email: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	senha: string;


	@IsString()
	@IsOptional()
	@MaxLength(100)
	nome?: string;
}
