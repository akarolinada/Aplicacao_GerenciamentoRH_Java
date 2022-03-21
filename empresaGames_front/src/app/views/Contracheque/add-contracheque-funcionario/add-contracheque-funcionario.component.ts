import { Component, OnInit } from '@angular/core';
import { ContrachequeService } from '../../../Services/contracheque.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Contracheque } from '../../../Models/ContrachequeModel';

@Component({
  selector: 'app-add-contracheque-funcionario',
  templateUrl: './add-contracheque-funcionario.component.html',
  styleUrls: ['./add-contracheque-funcionario.component.css']
})
export class AddContrachequeFuncionarioComponent implements OnInit {

  id_funcionario: any
  contracheque: Contracheque = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:'PENDENTE'
  }

  constructor(private contrachequeService: ContrachequeService,
              private router: Router,
              private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_funcionario = this.activatedroute.snapshot.paramMap.get('id_funcionario')
  }

  adicionarContracheque(){
    this.contrachequeService.adicionarContracheque(this.id_funcionario, this.contracheque).subscribe({
      next: () => {alert("Contracheque cadastrado com sucesso!")
                   this.router.navigate([`funcionarios/contracheque/${this.id_funcionario}`])},
      error: () => {alert("Erro ao cadastrar contracheque!")
                   this.router.navigate([`funcionarios/contracheque/${this.id_funcionario}`])},
      complete: () => {console.log("Complete!");
      }
    })
  }

}
