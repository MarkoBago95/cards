import { Component } from '@angular/core';
import { ClientResponse, ClientService } from 'src/app/services/client-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html'
})
export class ClientSearchComponent {
  oib = '';
  result?: ClientResponse;
  msg = '';

  constructor(private api: ClientService) {}

search() {
  this.api.getByOib(this.oib).subscribe({
    next: (r: any) => { this.result = r; this.msg = ''; },
    error: (e: any) => { this.result = undefined; this.msg = e?.error?.description ?? 'Nije pronađeno'; }
  });
}


 forward() {
  if (!this.result) return;
  this.api.forward(this.result.oib).subscribe({
    next: (r: { message: string }) => this.msg = r.message,
    error: (e: any) => this.msg = e?.error?.description ?? 'Greška pri slanju'
  });
}


remove() {
  this.api.delete(this.oib).subscribe({
    next: () => { this.result = undefined; this.msg = 'Obrisano'; },
    error: (e: any) => this.msg = e?.error?.description ?? 'Greška pri brisanju'
  });
}



}
