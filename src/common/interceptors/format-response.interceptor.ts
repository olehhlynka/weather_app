import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { WeatherResponse } from '../types/weather-response.type';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const {
          sunrise,
          sunset,
          temp,
          feels_like,
          pressure,
          humidity,
          uvi,
          wind_speed,
        } = data.data.current;
        return {
          sunrise,
          sunset,
          temp,
          feels_like,
          pressure,
          humidity,
          uvi,
          wind_speed,
        } as WeatherResponse;
      }),
    );
  }
}
