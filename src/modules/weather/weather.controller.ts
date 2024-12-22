import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { FetchWeatherDto } from '../../common/dtos/fetch-weather.dto';
import { GetWeatherDto } from '../../common/dtos/get-weather.dto';
import { FormatResponseInterceptor } from '../../common/interceptors/format-response.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  async fetchAndSaveWeather(@Body() fetchDto: FetchWeatherDto) {
    return this.weatherService.fetchAndSaveWeather(fetchDto);
  }

  @Get()
  @UseInterceptors(FormatResponseInterceptor)
  async getWeather(@Query() getDto: GetWeatherDto) {
    const weather = await this.weatherService.getWeather(getDto);
    if (!weather) {
      throw new NotFoundException('Weather data not found');
    }
    return weather;
  }
}
