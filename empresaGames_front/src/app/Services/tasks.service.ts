import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../Models/TaskModel';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  baseUrl: String = 'http://localhost:8081/empresaGames'

  mostrarTasksDoCargo(id_cargo: string):Observable<Tasks[]>{
    const url = `${this.baseUrl}/cargo/task/${id_cargo}`
    return this.http.get<Tasks[]>(url)
  }

  deletarTask(id_task:string):Observable<void>{
    const url = `${this.baseUrl}/cargo/task/${id_task}`
    return this.http.delete<void>(url)
  }

  marcarEmAndamento(id_task: string, task: Tasks):Observable<Tasks>{
    const url = `${this.baseUrl}/cargo/marcarEmAndamento/${id_task}`
    return this.http.put<Tasks>(url, task)
  }

  marcarConcluido(id_task: string, task: Tasks):Observable<Tasks>{
    const url = `${this.baseUrl}/cargo/marcarConcluido/${id_task}`
    return this.http.put<Tasks>(url, task)
  }

  adicionarTask(id_cargo: string, task: Tasks):Observable<Tasks>{
    const url = `${this.baseUrl}/cargo/task/${id_cargo}`
    return this.http.post<Tasks>(url, task)
  }

  editarTask(id_task: string, id_cargo: string, task: Tasks):Observable<Tasks>{
    const url = `${this.baseUrl}/cargo/task/${id_task}/${id_cargo}`
    return this.http.put<Tasks>(url, task)
  }

  mostrarUmaTask(id_task:string):Observable<Tasks>{
    const url = `${this.baseUrl}/tasks/${id_task}`
    return this.http.get<Tasks>(url)
  }
}
