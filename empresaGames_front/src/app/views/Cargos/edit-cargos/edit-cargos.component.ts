import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/Models/CargosModel';
import { CargosService } from 'src/app/Services/cargos.service';


@Component({
  selector: 'app-edit-cargos',
  templateUrl: './edit-cargos.component.html',
  styleUrls: ['./edit-cargos.component.css']
})
export class EditCargosComponent implements OnInit {

  cargo:Cargo = {
    id_cargo:'',
    car_nome:'',
    car_atribuicao:'',
    id_gerente:'',
    ger_nome:''
  }

  constructor(private cargoService:CargosService,private activedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.activedRoute.snapshot.paramMap.get('id_cargo')
    this.listaUmCargo()
  }

  listaUmCargo(){
    this.cargoService.listaUmCargo(this.cargo.id_cargo).subscribe(res =>{
      this.cargo = res;
    })
  }

  editarCargo(){
    this.cargoService.editCargo(this.cargo).subscribe({
      next: () => {alert('Projeto editado com sucesso!')
      this.router.navigate(['/cargo/list'])},
      error: () => {alert('Erro: Projeto não pôde ser editado!')
      this.router.navigate(['/cargo/list'])},
      complete: () => {console.log("Complete!")}
    })
  }

}
