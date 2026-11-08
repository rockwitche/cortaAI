import {
  IsString,
  IsUUID,
  Matches,
  Length,
  ArrayMaxSize,
  IsArray,
} from 'class-validator';
export class CreateAgendamentoDto {
  @Matches(/^\d{4}-\d{2}-\d{2}$/) data: string;
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/) horario: string;
  @IsString() @Length(1, 150) nomeCliente: string;
  @IsString() @Length(10, 20) telefoneCliente: string;
  @IsUUID() barbeariaId: string;
  @IsUUID() barbeiroId: string;
  @IsUUID() servicoId: string;
}
export class ConsultaAgendamentosDto {
  @IsString() @Length(10, 20) telefone: string;
  @IsArray()
  @ArrayMaxSize(100)
  @Matches(/^[a-f0-9]{64}$/, { each: true })
  comprovantes: string[];
}
