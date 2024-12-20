import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Marks this service as globally available
})
export class FinancialDataService {
  private baseUrl = 'http://localhost:3000'; // Mock API base URL

  constructor(private http: HttpClient) {} // Ensure HttpClient is injected

  getMetadata(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/metadata`);
  }

  getExchange(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/exchange`);
  }

  getCandle(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/candle`);
  }
}
