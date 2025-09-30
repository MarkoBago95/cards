import axios from 'axios';
export const api = axios.create({ baseURL: 'http://localhost:8080/api' });

export type ClientCreateRequest = { firstName:string; lastName:string; oib:string; status:string; };
export type ClientResponse = { firstName:string; lastName:string; oib:string; status:string; };

export const createClient = (b: ClientCreateRequest) => api.post<ClientResponse>('/clients', b).then(r => r.data);
export const getByOib      = (oib: string) => api.get<ClientResponse>(`/clients/${oib}`).then(r => r.data);
export const delByOib      = (oib: string) => api.delete<void>(`/clients/${oib}`);
export const forwardByOib  = (oib: string) => api.post<{message:string}>(`/clients/${oib}/forward`, {}).then(r => r.data);
