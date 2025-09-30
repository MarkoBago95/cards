import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface ClientCreateRequest { firstName:string; lastName:string; oib:string; status:string; }
export interface ClientResponse { firstName:string; lastName:string; oib:string; status:string; }

@Injectable({ providedIn: 'root' })
export class ClientService {
  private base = environment.apiBase + '/clients';
  constructor(private http: HttpClient) {}

  create(body: ClientCreateRequest): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.base, body);
  }
  getByOib(oib: string): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.base}/${oib}`);
  }
  delete(oib: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${oib}`);
  }
  forward(oib: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.base}/${oib}/forward`, {});
  }
}
