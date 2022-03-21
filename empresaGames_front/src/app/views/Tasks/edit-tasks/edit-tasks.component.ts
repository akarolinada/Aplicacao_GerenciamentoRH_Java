import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../Services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/Models/TaskModel';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent implements OnInit {

  id_task:any
  id_cargo:any
  task: Tasks = {
    id_task:'',
    task_titulo:'',
    task_descricao:'',
    task_status:''
  }

  constructor(private taskService: TasksService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id_task = this.activatedRoute.snapshot.paramMap.get('id_task')
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
    this.buscarUmaTask()
  }

  buscarUmaTask(){
    this.taskService.mostrarUmaTask(this.id_task).subscribe(res =>{
      this.task = res;
      console.log(this.task);

    })
  }

  editarTask(){
    this.taskService.editarTask(this.id_task, this.id_cargo,this.task).subscribe({
      next: () => {alert('Task editada com sucesso!')
                   this.router.navigate([`/cargo/task/${this.id_cargo}`])},
      error: () => {alert('Erro ao editar Task!')
                    this.router.navigate([`/cargo/task/${this.id_cargo}`])},
      complete: () => {console.log('Complete!');
      }
    })

  }

}
