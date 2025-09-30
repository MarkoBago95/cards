import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client-service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls:['./client-form.component.scss']
})
export class ClientFormComponent {
  constructor(private fb:FormBuilder, private api:ClientService) {}
  msg = '';

  statuses = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'APPROVED', value: 'APPROVED' },
    { label: 'REJECTED', value: 'REJECTED' }
  ];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    oib: ['', [Validators.required, Validators.pattern(/\d{11}/)]],
    status: ['PENDING', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;
    this.api.create(this.form.value as any).subscribe({
      next: r => this.msg = `Spremljeno: ${r.firstName} ${r.lastName} (${r.oib})`,
      error: e => this.msg = e?.error?.description ?? 'Greška'
    });
  }
}
