import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator';

export class CreateServicoDto {
  @IsString()
  @Length(2, 120)
  nome: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100_000)
  preco: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(720)
  duracao: number;

  @IsOptional()
  @IsUUID()
  barbeiroId?: string;
}

export class UpdateServicoDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  nome?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100_000)
  preco?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(720)
  duracao?: number;

  @IsOptional()
  @IsUUID()
  barbeiroId?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
