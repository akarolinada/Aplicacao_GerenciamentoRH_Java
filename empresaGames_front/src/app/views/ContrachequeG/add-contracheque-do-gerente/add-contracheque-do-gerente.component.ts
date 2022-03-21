import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContrachequegService } from 'src/app/Services/contrachequeg.service';
import { ContrachequeG } from '../../../Models/ContrachequeGModel';

@Component({
  selector: 'app-add-contracheque-do-gerente',
  templateUrl: './add-contracheque-do-gerente.component.html',
  styleUrls: ['./add-contracheque-do-gerente.component.css']
})
export class AddContrachequeDoGerenteComponent implements OnInit {
  id_gerente: any
  contracheque: ContrachequeG = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:'PENDENTE'
  }

  constructor(private contrachequeService: ContrachequegService,
              private router: Router,
              private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_gerente = this.activatedroute.snapshot.paramMap.get('id_gerente')
  }

  adicionarContracheque(){
    this.contrachequeService.adicionarContracheque(this.id_gerente, this.contracheque).subscribe({
      next: () => {alert("Contracheque cadastrado com sucesso!")
                   this.router.navigate([`gerente/contracheque/${this.id_gerente}`])},
      error: () => {alert("Erro ao cadastrar contracheque!")
                   this.router.navigate([`gerente/contracheque/${this.id_gerente}`])},
      complete: () => {console.log("Complete!");
      }
    })
  }

}
