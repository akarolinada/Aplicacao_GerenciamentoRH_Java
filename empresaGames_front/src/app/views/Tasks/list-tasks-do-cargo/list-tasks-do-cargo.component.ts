import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/Models/CargosModel';
import { Tasks } from 'src/app/Models/TaskModel';
import { TasksService } from '../../../Services/tasks.service';
import { CargosService } from '../../../Services/cargos.service';

@Component({
  selector: 'app-list-tasks-do-cargo',
  templateUrl: './list-tasks-do-cargo.component.html',
  styleUrls: ['./list-tasks-do-cargo.component.css']
})
export class ListTasksDoCargoComponent implements OnInit {

  id_cargo:any
  tasks: Tasks[] = []
  modal:boolean = false
  modal2: boolean = false
  modal3: boolean = false
  idModal: any
  tituloModal: any
  descricaoModal: any
  statusModal:any
  task: Tasks = {
    id_task:'',
    task_titulo:'',
    task_descricao:'',
    task_status:''
  }
  cargo: Cargo = {
   id_cargo:'',
   car_nome:'',
   car_atribuicao:''
  }
  filter!:string

  constructor(private tasksService: TasksService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private cargoService: CargosService) { }

  ngOnInit(): void {
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
    this.buscarTasksDoCargo()
    this.buscarUmCargo()
    this.mostrarModal(this.task);
    this.mostrarModal2(this.task);
    this.mostrarModal3(this.task);

  }

  buscarTasksDoCargo(){
    this.tasksService.mostrarTasksDoCargo(this.id_cargo).subscribe(res =>{
      this.tasks = res;
      console.log(this.tasks[0]);
    })
  }

  mostrarModal(task: Tasks){
    this.modal = true
    this.idModal = task.id_task
    this.tituloModal = task.task_titulo
    this.descricaoModal = task.task_descricao
    this.statusModal = task.task_status
    console.log(this.idModal);
  }

  deletarTask(){
    this.tasksService.deletarTask(this.idModal).subscribe({
      next: () => {alert("Task deletada com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      error: () => {alert("Erro ao deletar task!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  mostrarModal2(task: Tasks){
    this.modal2 = true
    this.modal = true
    this.idModal = task.id_task
    this.tituloModal = task.task_titulo
    this.descricaoModal = task.task_descricao
    this.statusModal = task.task_status
    console.log(this.idModal);
  }

  marcarEmAndamento(){
    this.tasksService.marcarEmAndamento(this.idModal, this.task).subscribe({
      next: () => {alert("Task marcada como EM ANDAMENTO com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      error: () => {alert("Erro ao marcar task como EM ANDAMENTO!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  mostrarModal3(task: Tasks){
    this.modal3 = true
    this.modal = true
    this.idModal = task.id_task
    this.tituloModal = task.task_titulo
    this.descricaoModal = task.task_descricao
    this.statusModal = task.task_status
    console.log(this.idModal);
  }

  marcarConcluida(){
    this.tasksService.marcarConcluido(this.idModal, this.task).subscribe({
      next: () => {alert("Task marcada como CONCLUIDA com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      error: () => {alert("Erro ao marcar task como CONCLUIDA!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/cargo/task/${this.id_cargo}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  buscarUmCargo(){
    this.cargoService.listaUmCargo(this.id_cargo).subscribe(res =>{
      this.cargo = res;
    })
  }

}
