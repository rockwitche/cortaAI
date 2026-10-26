import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  Length,
} from 'class-validator';

export enum UserType {
  CLIENTE = 'CLIENTE',
  BARBEIRO = 'BARBEIRO',
}

export class RegisterDto {
  @MaxLength(150)
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(72)
  senha: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsEnum(UserType, { message: 'Tipo inválido' })
  @IsOptional()
  tipo?: UserType;

  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsBoolean()
  @IsOptional()
  rememberMe?: boolean;
}

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Código deve ter 6 dígitos' })
  code: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  verificationToken?: string;
}

export class ResendCodeDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  verificationToken?: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(72)
  senha: string;
}
