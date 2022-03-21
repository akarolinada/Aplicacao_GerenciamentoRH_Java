import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/Models/FuncionarioModel';
import { FuncionariosService } from 'src/app/Services/funcionarios.service';

@Component({
  selector: 'app-list-funcionario',
  templateUrl: './list-funcionario.component.html',
  styleUrls: ['./list-funcionario.component.css'],
})
export class ListFuncionarioComponent implements OnInit {
  id_cargo: string = '';
  car_nome: string = '';
  funcionarios: Funcionario[] = [];
  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
  };
  idRemover: any;
  modal: boolean = false;
  nomeModal: any;
  cidadeModal: any;
  filter!: string;

  constructor(
    private funcionarioService: FuncionariosService,
    private activatedroute: ActivatedRoute,
    private funcionariosService: FuncionariosService,
    private router:Router
  ) {
    this.id_cargo = this.activatedroute.snapshot.paramMap.get('id_cargo')!;
    this.car_nome = this.activatedroute.snapshot.paramMap.get('car_nome')!;
  }

  ngOnInit(): void {
    this.buscarFuncionarioCargo();
  }

  buscarFuncionarioCargo() {
    this.funcionarioService
      .buscaFuncionariosCargo(this.id_cargo)
      .subscribe((res) => {
        this.funcionarios = res;
      });
  }

  mostrarModal(funcionario: Funcionario) {
    this.modal = true;
    this.idRemover = funcionario.id_funcionario;
    this.nomeModal = funcionario.func_nome;
    this.cidadeModal = funcionario.func_cidade;
  }

  deixarFuncionarioSemCargo() {
    this.funcionariosService
      .deixarFuncionarioSemCargo(this.funcionario, this.idRemover)
      .subscribe({
        complete: () => {
          alert('Funcionário Removido!')
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([`/funcionariosCargo/list/${this.id_cargo}/${this.car_nome}`]);
        })
        },
        error: () => {
          alert('Erro ao remover Funcionário!');
        },
        next: () => {
          console.log('Equipe modificada com sucesso!');
        },
      });
  }
}
