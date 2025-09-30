import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getByOib, delByOib, forwardByOib, type ClientResponse } from '../api';
import { Card } from 'primereact/card';

export default function ClientSearch() {
  const [oib, setOib] = useState('');
  const [result, setResult] = useState<ClientResponse>();
  const [msg, setMsg] = useState('');
  const search = async () => { try { setResult(await getByOib(oib)); setMsg(''); } catch(e:any){ setResult(undefined); setMsg(e?.response?.data?.description??'Nije pronađeno'); } };
  const remove = async () => { try { await delByOib(oib); setResult(undefined); setMsg('Obrisano'); } catch(e:any){ setMsg(e?.response?.data?.description??'Greška pri brisanju'); } };
  const forward = async () => { if(!result) return; try { const r=await forwardByOib(result.oib); setMsg(r.message); } catch(e:any){ setMsg(e?.response?.data?.description??'Greška pri slanju'); } };
  return (
       <Card title="Pretraga" className="p-mt-3">
      <div className="p-inputgroup p-mb-2">
        <span className="p-inputgroup-addon">OIB</span>
        <InputText maxLength={11} value={oib} onChange={e=>setOib(e.target.value)} />
        <Button label="Pretraži" icon="pi pi-search" severity="info" className="p-button-raised" onClick={search}/>
        <Button label="Obriši" icon="pi pi-trash" severity="danger" className="p-button-raised" onClick={remove} disabled={!oib}/>
      </div>

      {result && (
        <div className="p-d-flex p-ai-center p-jc-between p-mt-2">
          <p style={{margin:0}}>
            <b>{result.firstName} {result.lastName}</b> — {result.oib} — Status: <b>{result.status}</b>
          </p>
          <Button
            label="Proslijedi"
            icon="pi pi-send"
            severity="success"
            className="p-button-rounded p-button-raised"
            onClick={forward}
          />
        </div>
      )}

      <p className="p-mt-2">{msg}</p>
    </Card>

  );
}
