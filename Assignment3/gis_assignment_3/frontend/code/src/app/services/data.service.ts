import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Get Pubs from Backend
   */
  public getPubs(): Observable<
    { name: string; latitude: number; longitude: number }[]
  > {
    const url = 'http://localhost:5000/pubs';
    return this.http.post<
      { name: string; latitude: number; longitude: number }[]
    >(url, {}, httpOptions);
  }

  /**
   * Get Specific Amenity from Backend
   */
   public getAmenity(amenity: string): Observable<
   { name: string; latitude: number; longitude: number }[]
 > {
   const body = `{"amenity":"${amenity}"}`
   console.log(body)
   const headers = { 'content-type': 'application/json'}  
   const url = 'http://localhost:5000/get-amenity';
   return this.http.post<any>(url, body, {headers});
 }
}

