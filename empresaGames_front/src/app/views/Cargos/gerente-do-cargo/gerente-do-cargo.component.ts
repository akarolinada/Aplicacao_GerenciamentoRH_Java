import { Component, OnInit } from '@angular/core';
import { GerentesService } from '../../../Services/gerentes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosService } from '../../../Services/cargos.service';
import { Cargo } from 'src/app/Models/CargosModel';
import { Gerente } from 'src/app/Models/GerenteModel';

@Component({
  selector: 'app-gerente-do-cargo',
  templateUrl: './gerente-do-cargo.component.html',
  styleUrls: ['./gerente-do-cargo.component.css'],
})
export class GerenteDoCargoComponent implements OnInit {
  id_cargo: any;
  gerenteCadastrado: boolean = false;
  gerentesSemCargo: any;
  gerenteSemCargoEscolhido: any = [];
  gerente: Gerente = {
    id_gerente: '',
    ger_nome: '',
    ger_foto: '',
    id_cargo:''
  };
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  };
  modal: boolean = false
  nomeModal:any;
  cidadeModal:any
  idadeModal:any

  constructor(
    private gerenteService: GerentesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cargoService: CargosService
  ) {

  }

  ngOnInit(): void {
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo');
    this.buscarCargo();
    this.buscarGerenteDoCargo();
    this.buscarGerenteSemCargo();
  }

  buscarCargo() {
    this.cargoService.listaUmCargo(this.id_cargo).subscribe((res) => {
      this.cargo = res;
    });
  }

  buscarGerenteDoCargo() {
    this.gerenteService.buscarGerenteDoCargo(this.id_cargo).subscribe((res) => {
      if (res == undefined) {
        alert('Para esse Projeto não está definido um Líder');
        this.gerenteCadastrado = false
        console.log(res);
      } else {
        this.gerente = res;
        this.gerenteCadastrado = true
        console.log(res);
      }
    });
  }

  buscarGerenteSemCargo() {
    this.gerenteService.buscarGerentesSemCargo().subscribe((res) => {
      console.log(res);
      this.gerentesSemCargo = res;

    });
  }

  mostrarGerente() {
    console.log(this.gerenteSemCargoEscolhido);
    this.gerente = this.gerenteSemCargoEscolhido;
  }

  atribuirGerente() {
    this.cargoService.listaUmCargo(this.id_cargo).subscribe((res) => {
      this.cargo = res;
    });

    this.cargoService
      .atribuirGerente(this.cargo, this.id_cargo, this.gerente.id_gerente)
      .subscribe({
        complete: () => {
          alert('O Líder foi atribuído para o Projeto');
          this.router.navigate(['/cargo/list']);
        },
        error: () => {
          alert('Erro: o Líder não foi atribuído');
          this.router.navigate(['/cargo/list']);
        },
      });
  }

  deixarCargoSemGerente() {
    this.cargoService
      .deixarCargoSemGerente(this.cargo, this.id_cargo, this.gerente.id_gerente)
      .subscribe({
        complete: () => {
          alert('O Projeto agora está sem Líder!');
          this.router.navigate(['/cargo/list']);
        },
        error: () => {
          alert('Erro: o Líder não foi retirado do Projeto');
          this.router.navigate(['/cargo/list']);
        },
      });
  }

  mostrarModal(gerente:Gerente){
    this.modal = true
    this.nomeModal = gerente.ger_nome
    this.cidadeModal = gerente.ger_cidade
    this.idadeModal = gerente.ger_idade
  }
}
