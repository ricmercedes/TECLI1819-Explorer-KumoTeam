import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Trip } from '../models/trip.model';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-type': 'application/json' })
// }

@Injectable({
  providedIn: 'root'
})
export class TripService {

  tripsUrl = environment.backendApiBaseURL + '/trips';

  constructor(private http: HttpClient) { }

  getTrip(id: string) {
    const url = `${this.tripsUrl}/${id}`;
    return this.http.get<Trip>(url).toPromise();
  }

  getTrips() {
    const url = `${this.tripsUrl}`;
    return this.http.get<Trip[]>(url).toPromise();
  }
}
