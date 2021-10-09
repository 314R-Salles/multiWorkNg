import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationHttpService {

  IPGEOLOCATION_API_KEY = environment.IPGEOLOCATION_API_KEY;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Geolocation>(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.IPGEOLOCATION_API_KEY}`);
  }

  getWeather(lat, lon) {
    return this.http.get<Meteo>(environment.JAVA_API + `/meteo/lat/${lat}/lon/${lon}`);
  }

}

export class Geolocation {
  ip;
  continent_code;
  continent_name;
  country_code2;
  country_code3;
  country_name;
  country_capital;
  state_prov;
  district;
  city;
  zipcode;
  latitude;
  longitude;
  is_eu;
  calling_code;
  country_tld;
  languages;
  country_flag;
  geoname_id;
  isp;
  connection_type;
  organization;
  currency: { code, euro, symbol };
  time_zone: {
    name,
    offset,
    current_time,
    current_time_unix,
    is_dst,
    dst_savings,
  };
}

export class Meteo {
  timezone: string;
  current: {
    temp: number,
    feels_like: number,
    weather: [
      {
        id: number,
        main: string,
        description: string,
        icon: string
      }
    ]
  };
}
