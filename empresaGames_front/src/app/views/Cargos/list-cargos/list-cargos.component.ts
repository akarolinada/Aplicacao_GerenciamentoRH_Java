import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cargo } from 'src/app/Models/CargosModel';
import { CargosService } from 'src/app/Services/cargos.service';

@Component({
  selector: 'app-list-cargos',
  templateUrl: './list-cargos.component.html',
  styleUrls: ['./list-cargos.component.css'],
})
export class ListCargosComponent implements OnInit {

  modal: boolean = false;
  idExcluir: any;
  nomeModal: any;
  atribuicaoModal: any;
  cargo: any = [];
  filter!: string;


  constructor(private cargoService: CargosService, private router: Router) {}

  ngOnInit(): void {
    // this.mostrarCargos()
    this.listaCargosEGerentes();
  }

  // mostrarCargos(){
  //   this.cargoService.listaCargos().subscribe(res =>{
  //     this.cargo = res;
  //   })
  // }

  listaCargosEGerentes() {
    this.cargoService.listaCargosEGerentes().subscribe((res) => {
      console.log(res);
      res.forEach((element:any[]) => {
        let cargos: Cargo = {
          id_cargo:'',
          car_nome:'',
          car_atribuicao:'',
          id_gerente:'',
          ger_nome:''
        }

        cargos.id_cargo = element[0]
        cargos.car_nome = element[1]
        cargos.car_atribuicao = element[2]
        cargos.id_gerente = element[3]
        cargos.ger_nome = element[4]

        this.cargo.push(cargos);
      });


    });
  }

  mostrarModal(cargo: Cargo) {
    this.idExcluir = cargo.id_cargo;
    this.modal = true;
    this.nomeModal = cargo.car_nome;
    this.atribuicaoModal = cargo.car_atribuicao;
  }

  deletarCargo() {
    this.cargoService.deletarCargo(this.idExcluir).subscribe({
      complete: () => {alert("Projeto deletado com sucesso!")
                       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                       this.router.navigate(['/cargo/list'])})},
      error: () => {alert('O projeto não pôde ser deletado pois existem funcionários, taks ou um líder associado a ele. Desvincule-os primeiro!');
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/cargo/list'])})}
    });
  }
}
