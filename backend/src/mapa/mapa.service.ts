import { BadGatewayException, Injectable } from '@nestjs/common';
import { BuscarMapaDto } from './dto/buscar-mapa.dto.js';

interface ResultadoNominatim {
  lat: string;
  lon: string;
  display_name: string;
}

@Injectable()
export class MapaService {
  async buscar(dto: BuscarMapaDto) {
    const partes = [dto.endereco, dto.cep, dto.cidade, dto.estado, 'Brasil']
      .filter((parte): parte is string => Boolean(parte?.trim()))
      .map((parte) => parte.trim());

    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.search = new URLSearchParams({
      q: partes.join(', '),
      format: 'jsonv2',
      limit: '1',
      countrycodes: 'br',
      addressdetails: '1',
    }).toString();

    let resposta: Response;
    try {
      resposta = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'pt-BR',
          'User-Agent': 'CortaAi/1.0 (geocoding)',
        },
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      throw new BadGatewayException('Não foi possível consultar o serviço de mapas.');
    }

    if (!resposta.ok) {
      throw new BadGatewayException('O serviço de mapas está indisponível no momento.');
    }

    const resultados = (await resposta.json()) as ResultadoNominatim[];
    return {
      resultados: resultados
        .map((resultado) => ({
          latitude: Number(resultado.lat),
          longitude: Number(resultado.lon),
          nome: resultado.display_name,
        }))
        .filter((resultado) => Number.isFinite(resultado.latitude) && Number.isFinite(resultado.longitude)),
    };
  }
}
