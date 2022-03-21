import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/Models/CargosModel';
import { CargosService } from 'src/app/Services/cargos.service';

@Component({
  selector: 'app-add-cargos',
  templateUrl: './add-cargos.component.html',
  styleUrls: ['./add-cargos.component.css']
})
export class AddCargosComponent implements OnInit {

  cargo: Cargo = {
    id_cargo:'',
    car_nome:'',
    car_atribuicao:'',
    id_gerente:'',
    ger_nome:''
  }

  constructor(private cargoService:CargosService, private route:Router) { }

  ngOnInit(): void {
  }

  adicionarCargo(){
    this.cargoService.addCargo(this.cargo).subscribe(res =>{
      alert('Projeto adicionado com sucesso!')
      this.route.navigate(['/cargo/list'])
    })
  }

}
