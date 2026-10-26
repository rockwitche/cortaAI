import { IsOptional, IsString, MaxLength } from 'class-validator';

export class BuscarMapaDto {
  @IsString()
  @MaxLength(250)
  endereco: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  cidade?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  estado?: string;

  @IsOptional()
  @IsString()
  @MaxLength(9)
  cep?: string;
}
