import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cargo } from '../Models/CargosModel';
import { Gerente } from '../Models/GerenteModel';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  baseURL: String = "http://localhost:8081/empresaGames"

  constructor(private http:HttpClient) { }

  //metodo para listar todos os cargos para o select de atribuição de cargo para funcionario
  listaCargos():Observable<Cargo[]>{
    const url = `${this.baseURL}/cargo`
    return this.http.get<Cargo[]>(url)
  }

  //metodo que juntou em uma tabeça só os cargos e seus respectivos gerentes
  listaCargosEGerentes():Observable<any>{
    const url = `${this.baseURL}/cargo-gerente`
    return this.http.get<any>(url)
  }

  listaUmCargo(id_cargo:String):Observable<Cargo>{
    const url = `${this.baseURL}/cargo/${id_cargo}`
    return this.http.get<Cargo>(url)
  }

  //metodo para adicionar um cargo (sem gerente)
  addCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseURL}/cargo`
    return this.http.post<Cargo>(url,cargo)
  }

  //metodo para deletar um cargo (sem gerente e nem funcionario vinculado)
  deletarCargo(id:String):Observable<void>{
    const url = `${this.baseURL}/cargo/${id}`
    return this.http.delete<void>(url)
  }

  //metodo para editar cargo, mas não altera gerente, nem funcionarios
  editCargo(cargo:Cargo):Observable<Cargo>{
    const url = `${this.baseURL}/cargo/${cargo.id_cargo}`
    return this.http.put<Cargo>(url,cargo)
  }

  atribuirGerente(cargo:Cargo,id_cargo:String, id_gerente:String):Observable<void>{
  const url = `${this.baseURL}/cargo/definirGerente/${id_cargo}/${id_gerente}`
    return this.http.put<void>(url,cargo);
  }

  deixarCargoSemGerente(cargo:Cargo,id_cargo:String, id_gerente:String):Observable<void>{
    const url = `${this.baseURL}/cargo/tirarGerente/${id_cargo}/${id_gerente}`
    return this.http.put<void>(url,cargo);
  }
}
