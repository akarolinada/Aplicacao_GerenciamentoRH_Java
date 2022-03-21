import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gerente } from '../Models/GerenteModel';
import { Cargo } from '../Models/CargosModel';

@Injectable({
  providedIn: 'root'
})
export class GerentesService {

  constructor(private http: HttpClient) { }

  baseUrl: String ='http://localhost:8081/empresaGames'

  buscarGerenteDoCargo(id_cargo:string):Observable<Gerente>{
    const url = `${this.baseUrl}/gerente-cargo/${id_cargo}`
    return this.http.get<Gerente>(url)
  }

  buscarCargoDoGerente(id_gerente:string):Observable<Cargo>{
    const url = `${this.baseUrl}/cargo-do-gerente/${id_gerente}`
    return this.http.get<Cargo>(url)
  }

  buscarGerentesSemCargo():Observable<Gerente[]>{
    const url = `${this.baseUrl}/gerenteSemCargo`
    return this.http.get<Gerente[]>(url)
  }

  bucarCargosSemGerente():Observable<any>{
    const url = `${this.baseUrl}/cargoSemGerente`
    return this.http.get<any>(url)
  }

  buscarGerentesESeusCargos():Observable<any[]>{
    const url = `${this.baseUrl}/gerentesESeusCargos`
    return this.http.get<any[]>(url)
  }

  vinculoGer(id_gerente: string, gerente: Gerente):Observable<Gerente>{
    const url = `${this.baseUrl}/gerente/vinculo/${id_gerente}`
    return this.http.put<Gerente>(url, gerente)
  }

  cadastrarGerente(gerente: Gerente):Observable<Gerente>{
  const url = `${this.baseUrl}/gerente`
  return this.http.post<Gerente>(url, gerente)
  }

  editarGerente(id_gerente:string, gerente:Gerente):Observable<Gerente>{
    const url = `${this.baseUrl}/gerente/${id_gerente}`
    return this.http.put<Gerente>(url,gerente)
  }

  buscarUmGerente(id_gerente:string):Observable<Gerente>{
    const url = `${this.baseUrl}/gerente/${id_gerente}`
    return this.http.get<Gerente>(url)
  }

  atribuirCargoAoGerente(gerente:Gerente, id_gerente:string, id_cargo: string):Observable<void>{
    const url = `${this.baseUrl}/gerente/definirCargo/${id_gerente}/${id_cargo}`
    return this.http.put<void>(url,gerente)
  }

  buscarGerentePeloNome(ger_nome:string):Observable<Gerente>{
    const url = `${this.baseUrl}/gerente-nome/${ger_nome}`
    return this.http.get<Gerente>(url)
  }

  buscaFuncionarioPromovido():Observable<Gerente>{
    const url = `${this.baseUrl}/funcionarioPromovido`
    return this.http.get<Gerente>(url)
  }




}
