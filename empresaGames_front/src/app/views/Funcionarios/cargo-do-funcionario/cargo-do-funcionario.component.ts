import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../../Services/funcionarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/Models/FuncionarioModel';
import { CargosService } from '../../../Services/cargos.service';
import { Cargo } from 'src/app/Models/CargosModel';

@Component({
  selector: 'app-cargo-do-funcionario',
  templateUrl: './cargo-do-funcionario.component.html',
  styleUrls: ['./cargo-do-funcionario.component.css']
})
export class CargoDoFuncionarioComponent implements OnInit {

  id_funcionario:any;
  funcionario: Funcionario = {
    id_funcionario:'',
    func_nome:'',
    func_cidade:''
  }
  id_cargo:any;
  cargo: Cargo = {
    id_cargo:'',
    car_nome:'',
    car_atribuicao:''
  }
  cargos: any = []
  modal:boolean = false
  idRemover:any;
  nomeModal:any;
  atribuicaoModal:any;


  constructor(private funcionarioService: FuncionariosService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cargoService: CargosService) { }

  ngOnInit(): void {
    this.id_funcionario = this.activatedRoute.snapshot.paramMap.get('id_funcionario');
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
    console.log(this.id_cargo)
    this.buscarFuncionario();
    this.buscarCargoDoFuncionario();
    this.buscarTodosCargos()
    if(this.id_cargo == 0){
      alert("Este funcionário não tem projeto!")
    }
  }

  buscarFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(res =>{
      this.funcionario = res;
    })
  }

  buscarCargoDoFuncionario(){
    this.cargoService.listaUmCargo(this.id_cargo).subscribe(res =>{
        this.cargo = res
    })
  }

  buscarTodosCargos(){
    this.cargoService.listaCargos().subscribe(res =>{
      this.cargos = res;
    })
  }

  mostrarCargo(){
    console.log(this.cargo);

  }

  atribuirCargoAoFuncionario(){
    this.funcionarioService.atribuirCargoAoFuncionario(this.id_funcionario, this.cargo).subscribe({
      next: () => {alert("Novo projeto atribuido com sucesso!")
                   this.router.navigate(['/funcionarios/list'])},
      error: () => {alert("Erro ao atribuir novo projeto ao funcionpario!")
                    this.router.navigate(['/funcionarios/list'])},
      complete: () => {console.log("Complete!");
      }
    })
  }

  mostrarModal(cargo: Cargo) {
    this.modal = true;
    this.idRemover = cargo.id_cargo;
    this.nomeModal = cargo.car_nome;
    this.atribuicaoModal = cargo.car_atribuicao;
  }

  deixarFuncionarioSemCargo() {
    this.funcionarioService
      .deixarFuncionarioSemCargo(this.funcionario, this.id_funcionario).subscribe({
        complete: () => {alert('Cargo Removido!');
                        this.router.navigate(['/funcionarios/list'])},
        error: () => {alert('Erro ao remover projeto!')},
        next: () => {console.log('Complete!')},
      });
  }
}
