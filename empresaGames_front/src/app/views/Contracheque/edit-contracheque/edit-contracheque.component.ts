import { Component, OnInit } from '@angular/core';
import { ContrachequeService } from '../../../Services/contracheque.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contracheque } from '../../../Models/ContrachequeModel';

@Component({
  selector: 'app-edit-contracheque',
  templateUrl: './edit-contracheque.component.html',
  styleUrls: ['./edit-contracheque.component.css']
})
export class EditContrachequeComponent implements OnInit {

  id_contracheque:any
  contracheque: Contracheque = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:'PENDENTE'
  }
  id_funcionario:any

  constructor(private contrachequeService:ContrachequeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id_contracheque = this.activatedRoute.snapshot.paramMap.get('id_contracheque')
    this.id_funcionario = this.activatedRoute.snapshot.paramMap.get('id_funcionario')
    this.mostrarContracheque()
  }

  mostrarContracheque(){
    this.contrachequeService.mostrarUmContracheque(this.id_contracheque).subscribe(res => {
      this.contracheque = res;
      this.contracheque.cc_data_emissao = res.cc_data_emissao.slice(0,10)


    })
  }

  editarContracheque(){
    this.contrachequeService.editarContracheque(this.id_contracheque,this.id_funcionario, this.contracheque).subscribe({
      next: () => {alert("Contracheque editado com sucesso!")
                   this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])},
      error: () => {alert("Erro ao editar contracheque")
                  this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])},
      complete: () => {console.log("Complete!!");
      }
    })
  }







}
