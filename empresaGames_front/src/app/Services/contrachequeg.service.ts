import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContrachequeG } from '../Models/ContrachequeGModel';

@Injectable({
  providedIn: 'root'
})
export class ContrachequegService {

  constructor(private http:HttpClient) { }

  baseUrl: String = 'http://localhost:8081/empresaGames'

  mostrarContrachequesDoGerente(id_gerente: string):Observable<ContrachequeG[]>{
    const url = `${this.baseUrl}/gerente/contracheque/${id_gerente}`
    return this.http.get<ContrachequeG[]>(url)
  }

  deletarContracheque(id_contracheque:string):Observable<void>{
    const url = `${this.baseUrl}/gerente/contracheque/${id_contracheque}`
    return this.http.delete<void>(url)
  }

  entregarContracheque(id_contracheque: string, contracheque: ContrachequeG):Observable<ContrachequeG>{
    const url = `${this.baseUrl}/gerente/entregarContracheque/${id_contracheque}`
    return this.http.put<ContrachequeG>(url, contracheque)
  }

  adicionarContracheque(id_gerente: string, contracheque: ContrachequeG):Observable<ContrachequeG>{
    const url = `${this.baseUrl}/gerente/contracheque/${id_gerente}`
    return this.http.post<ContrachequeG>(url, contracheque)
  }

  editarContracheque(id_contracheque: string, id_gerente: string, contracheque: ContrachequeG):Observable<ContrachequeG>{
    const url = `${this.baseUrl}/gerente/contracheque/${id_contracheque}/${id_gerente}`
    return this.http.put<ContrachequeG>(url, contracheque)
  }

  mostrarUmContracheque(id_contracheque:string):Observable<ContrachequeG>{
    const url = `${this.baseUrl}/contrachequeGerente/${id_contracheque}`
    return this.http.get<ContrachequeG>(url)
  }
}
