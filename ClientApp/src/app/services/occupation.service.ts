import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { occupation } from '../models/occupation';
import { occupationRatings } from '../models/occupationRating';
//import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OccupationService {
  apiBaseUrl = "http://localhost:5035/api/";
  occupationsUrl = 'occupation/GetAllOccupations';
  occupationRatingsUrl = 'occupation/GetAllOccupationRatings';
  constructor(private http: HttpClient) { }

  getOccupations() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Array<occupation>>(this.apiBaseUrl + this.occupationsUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getOccupationRatings() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Array<occupationRatings>>(this.apiBaseUrl + this.occupationRatingsUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
