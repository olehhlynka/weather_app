import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from '../../database/entities/weather.entity';
import { FetchWeatherDto } from '../../common/dtos/fetch-weather.dto';
import { GetWeatherDto } from '../../common/dtos/get-weather.dto';

@Injectable()
export class WeatherService {
  private readonly API_URL = 'https://api.openweathermap.org/data/3.0/onecall';
  private readonly API_KEY = process.env.OPENWEATHER_API_KEY;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
    private httpService: HttpService,
  ) {}

  async fetchAndSaveWeather(fetchDto: FetchWeatherDto) {
    const { lat, lon, part } = fetchDto;
    const params = { lat, lon, exclude: part, appid: this.API_KEY };

    console.log(params);

    const { data: weatherData } = await this.httpService.axiosRef.get(
      this.API_URL,
      {
        params,
      },
    );

    const weather = this.weatherRepository.create({
      lat,
      lon,
      part,
      data: weatherData,
    });

    return this.weatherRepository.save(weather);
  }

  async getWeather(getDto: GetWeatherDto): Promise<Weather | null> {
    const { lat, lon, part } = getDto;

    return this.weatherRepository.findOne({ where: { lat, lon, part } });
  }
}
