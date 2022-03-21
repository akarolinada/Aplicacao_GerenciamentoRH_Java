import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../../Services/funcionarios.service';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/FuncionarioModel';

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.css']
})
export class AddFuncionarioComponent implements OnInit {

  funcionario: Funcionario = {
    id_funcionario:'',
    func_nome:'',
    func_cidade:''
  }

  constructor(private funcionariosService: FuncionariosService,
              private router: Router) { }

  ngOnInit(): void {
  }

  cadastrarFuncionario(){
    this.funcionariosService.cadastrarFuncionario(this.funcionario).subscribe(res => {
      this.funcionario = res
      this.router.navigate(['/funcionarios/list'])
    })
  }
}
