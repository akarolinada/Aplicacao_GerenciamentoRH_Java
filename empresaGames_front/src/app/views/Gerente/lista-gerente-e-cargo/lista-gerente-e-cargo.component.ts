import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/app/Models/GerenteModel';
import { GerentesService } from '../../../Services/gerentes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-gerente-e-cargo',
  templateUrl: './lista-gerente-e-cargo.component.html',
  styleUrls: ['./lista-gerente-e-cargo.component.css'],
})
export class ListaGerenteECargoComponent implements OnInit {
  gerente: any = [];
  modal:boolean = false
  idVinculo: any
  nomeVinculo: any
  cidadeVinculo: any
  idadeVinculo: any
  cargoVinculo: any
  botaoVinculo: any
  fotoModal:any
  modal2:boolean = false
  filter!: string

  constructor(private gerenteServive: GerentesService,
              private router: Router) {}

  ngOnInit(): void {
    this.buscarGerentesESeusCargos();
  }

  buscarGerentesESeusCargos() {
    this.gerenteServive.buscarGerentesESeusCargos().subscribe((res) => {
      console.log(res);
      res.forEach((e:any[]) => {

        let gerentes: Gerente = {
          id_gerente: '',
          ger_nome: '',
          ger_idade: '',
          ger_cidade: '',
          ger_foto: '',
          id_cargo: '',
          car_nome: '',
          ger_vinculo: 0
        }

        gerentes.id_gerente = e[0]
        gerentes.ger_nome = e[1]
        gerentes.ger_cidade = e[2]
        gerentes.ger_idade = e[3]
        gerentes.ger_foto = e[4]
        if(e[5] != null){
          gerentes.id_cargo = e[5]
        } else {
          gerentes.id_cargo = 0
        }
        gerentes.car_nome = e[6]
        gerentes.ger_vinculo = e[7]

        this.gerente.push(gerentes)
      });
    });
  }

  mostrarModal(gerente: Gerente){
    this.modal = true
    this.idVinculo = gerente.id_gerente
    this.nomeVinculo = gerente.ger_nome
    this.cidadeVinculo = gerente.ger_cidade
    this.idadeVinculo = gerente.ger_idade
    this.cargoVinculo = gerente.car_nome
    this.botaoVinculo = gerente.ger_vinculo
  }

  desvincularGerente(){
    this.gerenteServive.vinculoGer(this.idVinculo, this.gerente).subscribe({
      next: () => {this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/gerentes/list'])})},
      error: () => {alert('Erro ao desvincular Líder!')},
      complete: () => {console.log('Complete!')}
    });
  }

  vincularGerente(){
    this.gerenteServive.vinculoGer(this.idVinculo, this.gerente).subscribe({
      next: () => {this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/gerentes/list'])})},
      error: () => {alert('Erro ao vincular Líder!')},
      complete: () => {console.log('Complete!')}
    });
  }

  mostrarModal2(gerente: Gerente){

    //this.fotoModal = gerente.ger_foto.slice(96)
    this.fotoModal = gerente.ger_foto
    console.log(this.fotoModal);


    this.modal2 = true
  }


}
