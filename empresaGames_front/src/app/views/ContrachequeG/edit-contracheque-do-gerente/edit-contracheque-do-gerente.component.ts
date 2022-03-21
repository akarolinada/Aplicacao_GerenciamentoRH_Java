import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContrachequegService } from 'src/app/Services/contrachequeg.service';
import { ContrachequeG } from '../../../Models/ContrachequeGModel';

@Component({
  selector: 'app-edit-contracheque-do-gerente',
  templateUrl: './edit-contracheque-do-gerente.component.html',
  styleUrls: ['./edit-contracheque-do-gerente.component.css']
})
export class EditContrachequeDoGerenteComponent implements OnInit {
  id_contracheque:any
  contracheque: ContrachequeG = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:'PENDENTE'
  }
  id_gerente:any

  constructor(private contrachequeService:ContrachequegService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id_contracheque = this.activatedRoute.snapshot.paramMap.get('id_contracheque')
    this.id_gerente = this.activatedRoute.snapshot.paramMap.get('id_gerente')
    this.mostrarContracheque()
  }

  mostrarContracheque(){
    this.contrachequeService.mostrarUmContracheque(this.id_contracheque).subscribe(res => {
      this.contracheque = res;
      this.contracheque.cc_data_emissao = res.cc_data_emissao.slice(0,10)


    })
  }

  editarContracheque(){
    this.contrachequeService.editarContracheque(this.id_contracheque,this.id_gerente, this.contracheque).subscribe({
      next: () => {alert("Contracheque editado com sucesso!")
                   this.router.navigate([`/funcionarios/contracheque/${this.id_gerente}`])},
      error: () => {alert("Erro ao editar contracheque")
                  this.router.navigate([`/funcionarios/contracheque/${this.id_gerente}`])},
      complete: () => {console.log("Complete!!");
      }
    })
  }

}
