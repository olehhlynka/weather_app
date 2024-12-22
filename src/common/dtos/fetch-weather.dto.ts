import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class FetchWeatherDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  lon: number;

  @IsOptional()
  @IsString()
  part?: string;
}
