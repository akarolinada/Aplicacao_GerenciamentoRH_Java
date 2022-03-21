import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from '../Models/FuncionarioModel';
import { Cargo } from '../Models/CargosModel';
import { Gerente } from '../Models/GerenteModel';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  baseURL: string = 'http://localhost:8081/empresaGames';

  constructor(private http: HttpClient) {}

  buscaFuncionariosCargo(id_cargo: string): Observable<Funcionario[]> {
    const url = `${this.baseURL}/funcionario/busca-cargo/${id_cargo}`;
    return this.http.get<Funcionario[]>(url);
  }

  buscarUmFuncionario(id_funcionario: string): Observable<Funcionario> {
    const url = `${this.baseURL}/funcionario/${id_funcionario}`;
    return this.http.get<Funcionario>(url);
  }

  buscaTodosFuncionarios():Observable<any>{
    const url = `${this.baseURL}/funcionario-cargo`
    return this.http.get<any>(url)
  }

  // cadastrarFuncionario(
  //   funcionario: Funcionario,
  //   id_cargo: string
  // ): Observable<Funcionario> {
  //   const url = `${this.baseURL}/funcionario/?cargo=${id_cargo}`;
  //   return this.http.post<Funcionario>(url, funcionario);
  // }

  cadastrarFuncionario(funcionario: Funcionario):Observable<Funcionario>{
    const url = `${this.baseURL}/funcionario`
    return this.http.post<Funcionario>(url,funcionario)
  }

  deletarFuncionario(id:string): Observable<void> {
    const url = `${this.baseURL}/funcionario/${id}`;
    return this.http.delete<void>(url);
  }

  editarFuncionario(id_funcionario: string, funcionario: Funcionario): Observable<Funcionario> {
    const url = `${this.baseURL}/funcionario/${id_funcionario}`
    return this.http.put<Funcionario>(url,funcionario);
  }

  vinculoFunc(id_funcionario: String, funcionario: Funcionario):Observable<void>{
    const url = `${this.baseURL}/funcionario/vinculo/${id_funcionario}`;
    return this.http.put<void>(url, funcionario)
  }

  atribuirCargoAoFuncionario(id_funcionario:string, cargo: Cargo):Observable<Funcionario>{
    const url = `${this.baseURL}/funcionario/aplicarCargo/${id_funcionario}`
    return this.http.put<Funcionario>(url, cargo)
  }

  deixarFuncionarioSemCargo(funcionario: Funcionario, id_funcionario: string): Observable<Funcionario> {
    const url = `${this.baseURL}/funcionario/deixarSemCargo/${id_funcionario}`;
    return this.http.put<Funcionario>(url, funcionario);
  }

 copiaDoFuncionario(id_funcionario: string, gerente: Gerente):Observable<Gerente>{
   const url = `${this.baseURL}/copiaDoFuncionario/${id_funcionario}`
   return this.http.post<Gerente>(url,gerente)
 }


}
