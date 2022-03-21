import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../../Services/funcionarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/FuncionarioModel';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {


  funcionario: Funcionario = {
    id_funcionario:'',
    func_nome:'',
    func_cidade:'',
    func_vinculo:1
  }
  id_funcionario:any
  func_vinculo: any

  constructor(private funcionarioService: FuncionariosService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_funcionario = this.activatedRoute.snapshot.paramMap.get('id_funcionario');


    console.log(this.id_funcionario);
    this.buscarUmFuncionario();
  }

  buscarUmFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(res =>{
      this.funcionario = res;
      console.log(res);

    })
  }

  editarFuncionario(){
    this.funcionarioService.editarFuncionario(this.id_funcionario,this.funcionario).subscribe({
      next: () => {alert('Funcinário editado com sucesso!')
                   this.router.navigate(['/funcionarios/list'])},
      error: () => {alert('Erro: Funcionário não pôde ser editado!')
                    this.router.navigate(['/funcionarios/list'])},
      complete: () => {console.log("Complete!")}
    })
  }

}
