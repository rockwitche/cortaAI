import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateBarbeariaDto {
  @IsString()
  @Length(2, 120)
  nome: string;

  @IsString()
  @Length(2, 200)
  endereco: string;

  @IsString()
  @Length(2, 120)
  cidade: string;

  @IsString()
  @Length(2, 2)
  estado: string;

  @IsOptional()
  @IsString()
  @MaxLength(2_000)
  descricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pontoReferencia?: string;

  @IsOptional()
  @Type(() => Number)
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  whatsapp?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1_000)
  mensagemLembrete?: string;

  @IsOptional()
  @IsBoolean()
  lembreteAtivo?: boolean;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(2_000)
  foto?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({ require_tld: false }, { each: true })
  fotos?: string[];

  @IsOptional()
  @IsBoolean()
  ativa?: boolean;
}

export class UpdateBarbeariaDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  nome?: string;

  @IsOptional()
  @IsString()
  @Length(2, 200)
  endereco?: string;

  @IsOptional()
  @IsString()
  @Length(2, 120)
  cidade?: string;

  @IsOptional()
  @IsString()
  @Length(2, 2)
  estado?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2_000)
  descricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  pontoReferencia?: string;

  @IsOptional()
  @Type(() => Number)
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  whatsapp?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1_000)
  mensagemLembrete?: string;

  @IsOptional()
  @IsBoolean()
  lembreteAtivo?: boolean;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(2_000)
  foto?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({ require_tld: false }, { each: true })
  fotos?: string[];

  @IsOptional()
  @IsBoolean()
  ativa?: boolean;
}
