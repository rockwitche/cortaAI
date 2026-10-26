import { IsBoolean, IsOptional, IsString, IsUrl, Length, MaxLength } from 'class-validator';

export class CreateBarbeiroDto {
  @IsString()
  @Length(2, 120)
  nome: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(2_000)
  foto?: string;
}

export class UpdateBarbeiroDto {
  @IsOptional()
  @IsString()
  @Length(2, 120)
  nome?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  @MaxLength(2_000)
  foto?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
