import { Component, OnInit } from '@angular/core';
import { GerentesService } from '../../../Services/gerentes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CargosService } from '../../../Services/cargos.service';
import { Gerente } from 'src/app/Models/GerenteModel';
import { Cargo } from 'src/app/Models/CargosModel';

@Component({
  selector: 'app-cargo-do-gerente',
  templateUrl: './cargo-do-gerente.component.html',
  styleUrls: ['./cargo-do-gerente.component.css']
})
export class CargoDoGerenteComponent implements OnInit {

  id_gerente:any;
  id_cargo:any;
  gerente: Gerente = {
    id_gerente:'',
    ger_nome:'',
    ger_cidade:'',
    ger_idade:'',
    ger_foto:'',
    id_cargo:''
  }
  cargo: Cargo = {
    id_cargo:'',
    car_nome:'',
    car_atribuicao:''
  }
  cargoSemGerente:any = []
  cargoSemGerenteEscolhido: any = []
  nomeModal:any
  atribuicaoModal:any
  modal:boolean = false

  constructor(private gerenteService: GerentesService,
              private activatedRoute: ActivatedRoute,
              private cargoService: CargosService,
              private router: Router) { }

  ngOnInit(): void {
    this.id_gerente = this.activatedRoute.snapshot.paramMap.get('id_gerente')
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
    this.buscarGerente()
    this.buscarCargoDoGerente()
    this.cargosSemGerente()
    this.mostrarModal(this.cargo);
  }

  buscarGerente(){
    this.gerenteService.buscarUmGerente(this.id_gerente).subscribe(res =>{
      this.gerente = res;
    })
  }

  buscarCargoDoGerente(){
    this.gerenteService.buscarCargoDoGerente(this.id_gerente).subscribe(res => {
      console.log(res);
      if (res == undefined) {
        alert('Para esse Líder não está definido um Projeto');
        console.log(res);
      } else {
        this.cargo = res;
        console.log(res);
      }
    })
  }

  cargosSemGerente(){
    this.gerenteService.bucarCargosSemGerente().subscribe(res => {
      res.forEach((e:any[]) =>{
        let cargosSemGerente:Cargo = {
          id_cargo:'',
          car_nome:'',
          car_atribuicao:''
        }

        cargosSemGerente.id_cargo=e[0]
        cargosSemGerente.car_nome=e[1]
        cargosSemGerente.car_atribuicao=e[2]

        this.cargoSemGerente.push(cargosSemGerente)
        console.log(this.cargoSemGerente);

      })

    })
  }

  mostrarCargo() {
    console.log(this.cargoSemGerenteEscolhido);
    this.cargo = this.cargoSemGerenteEscolhido;
  }

  atribuirCargoAoGerente() {
    this.gerenteService.buscarUmGerente(this.id_gerente).subscribe((res) => {
      this.gerente = res;
    });

    this.gerenteService.atribuirCargoAoGerente(this.gerente, this.id_gerente, this.cargo.id_cargo)
      .subscribe({
        complete: () => {
          alert('O Projeto foi atribuído para o Líder');
          this.router.navigate(['/gerentes/list']);
        },
        error: () => {
          alert('Erro: o Prjeto não foi atribuído');
          this.router.navigate(['/gerentes/list']);
        },
      });
  }

  mostrarModal(cargo:Cargo){
    this.nomeModal = cargo.car_nome
    this.atribuicaoModal = cargo.car_atribuicao
    this.modal = true

  }

  deixarGerenteSemCargo() {
    this.cargoService
      .deixarCargoSemGerente(this.cargo, this.id_cargo, this.gerente.id_gerente)
      .subscribe({
        complete: () => {
          alert('O Líder agora está sem Projeto!');
          this.router.navigate(['/cargo/list']);
        },
        error: () => {
          alert('Erro: o Proieto não foi retirado do Líder');
          this.router.navigate(['/gerente/list']);
        },
      });
  }



}
