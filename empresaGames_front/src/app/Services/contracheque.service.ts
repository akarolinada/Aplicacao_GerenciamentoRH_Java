import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contracheque } from '../Models/ContrachequeModel';

@Injectable({
  providedIn: 'root'
})
export class ContrachequeService {

  constructor(private http:HttpClient) { }

  baseUrl: String = 'http://localhost:8081/empresaGames'

  mostrarContrachequesDoFuncionario(id_funcionario: string):Observable<Contracheque[]>{
    const url = `${this.baseUrl}/funcionario/contracheque/${id_funcionario}`
    return this.http.get<Contracheque[]>(url)
  }

  deletarContracheque(id_contracheque:string):Observable<void>{
    const url = `${this.baseUrl}/funcionario/contracheque/${id_contracheque}`
    return this.http.delete<void>(url)
  }

  entregarContracheque(id_contracheque: string, contracheque: Contracheque):Observable<Contracheque>{
    const url = `${this.baseUrl}/funcionario/entregarContracheque/${id_contracheque}`
    return this.http.put<Contracheque>(url, contracheque)
  }

  adicionarContracheque(id_funcionario: string, contracheque: Contracheque):Observable<Contracheque>{
    const url = `${this.baseUrl}/funcionario/contracheque/${id_funcionario}`
    return this.http.post<Contracheque>(url, contracheque)
  }

  editarContracheque(id_contracheque: string, id_funcionario: string, contracheque: Contracheque):Observable<Contracheque>{
    const url = `${this.baseUrl}/funcionario/contracheque/${id_contracheque}/${id_funcionario}`
    return this.http.put<Contracheque>(url, contracheque)
  }

  mostrarUmContracheque(id_contracheque:string):Observable<Contracheque>{
    const url = `${this.baseUrl}/contracheque/${id_contracheque}`
    return this.http.get<Contracheque>(url)
  }
}
