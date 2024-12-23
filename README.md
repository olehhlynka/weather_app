# Weather Data Fetcher API

This project is a NestJS application that fetches weather data from the [OpenWeatherMap One Call API](https://openweathermap.org/api/one-call-3#current) and stores it in a PostgreSQL database. The project exposes two API endpoints:

### API Endpoints

1. **POST `/weather`**

   - **Description**: Accepts `lat`, `lon`, and `part` as query string parameters, fetches the weather data from the OpenWeatherMap API, and stores it in the database.
   - **Query Parameters**:
     - `lat` (required): Latitude.
     - `lon` (required): Longitude.
     - `part` (optional): Part of the weather data (e.g., `current`, `hourly`, etc.).

   Example request:

   ```http
   POST /weather?lat=35.6895&lon=139.6917&part=current
   ```

2. **GET `/weather`**

   - **Description**: Accepts `lat`, `lon`, and `part` as query string parameters, retrieves the stored weather data from the database, and returns the data in the response.
   - **Query Parameters**:
     - `lat` (required): Latitude.
     - `lon` (required): Longitude.
     - `part` (optional): Part of the weather data (e.g., `current`, `hourly`, etc.).

   Example request:

   ```http
   GET /weather?lat=35.6895&lon=139.6917&part=current
   ```

   Example response

   ```json
   {
     "sunrise": 1684926645,
     "sunset": 1684977332,
     "temp": 292.55,
     "feels_like": 292.87,
     "pressure": 1014,
     "humidity": 89,
     "uvi": 0.16,
     "wind_speed": 3.13
   }
   ```
