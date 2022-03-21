import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../Services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/Models/TaskModel';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  task: Tasks = {
    id_task:'',
    task_titulo:'',
    task_descricao:'',
    task_status:'PENDENTE'

  }
  id_cargo: any

  constructor(private tasksServie: TasksService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
  }

  adicionarTask(){
    this.tasksServie.adicionarTask(this.id_cargo, this.task).subscribe({
      next:() => {alert("Task adicionada com sucesso!")
                  this.router.navigate([`/cargo/task/${this.id_cargo}`])},
      error: () => {alert('Erro ao adicionar Task!')
                  this.router.navigate([`/cargo/task/${this.id_cargo}`])},
      complete: () => {console.log('Complete!')}
    })
  }

}
