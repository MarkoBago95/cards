import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { createClient, type ClientCreateRequest, type ClientResponse } from '../api';

const statuses = ['PENDING','APPROVED','REJECTED'];

export default function ClientForm() {
  const [form, setForm] = useState<ClientCreateRequest>({ firstName:'', lastName:'', oib:'', status:'PENDING' });
  const [msg, setMsg] = useState('');
  const submit = async () => {
    if (!/^\d{11}$/.test(form.oib) || !form.firstName || !form.lastName) { setMsg('Provjeri polja'); return; }
    try { const r: ClientResponse = await createClient(form); setMsg(`Spremljeno: ${r.firstName} ${r.lastName} (${r.oib})`); }
    catch (e:any) { setMsg(e?.response?.data?.description ?? 'Greška'); }
  };
  return (
    <Card title="Unos klijenta" className="p-mb-3">
      <div className="p-fluid">
        <div className="p-fluid">
        <span className="p-inputgroup p-mb-2"><span className="p-inputgroup-addon">Ime</span>
          <InputText value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})}/></span>
        <span className="p-inputgroup p-mb-2"><span className="p-inputgroup-addon">Prezime</span>
          <InputText value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})}/></span>
        <span className="p-inputgroup p-mb-2"><span className="p-inputgroup-addon">OIB</span>
          <InputText maxLength={11} value={form.oib} onChange={e=>setForm({...form, oib:e.target.value})}/></span>
        <Dropdown value={form.status} options={statuses} onChange={e=>setForm({...form, status:e.value})} className="p-mb-2"/>
      </div>
        <div className="p-mt-2">
          <Button
            label="Spremi"
            icon="pi pi-save"
            severity="info"
            className="p-button-rounded p-button-raised"
            onClick={submit}
          />
        </div>
      </div>
      <p className="p-mt-2">{msg}</p>
    </Card>
  );
}
