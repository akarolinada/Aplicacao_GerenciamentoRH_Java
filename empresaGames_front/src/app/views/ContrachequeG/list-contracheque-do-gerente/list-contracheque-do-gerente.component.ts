import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContrachequeG } from 'src/app/Models/ContrachequeGModel';
import { Gerente } from 'src/app/Models/GerenteModel';
import { GerentesService } from '../../../Services/gerentes.service';
import { ContrachequegService } from '../../../Services/contrachequeg.service';

@Component({
  selector: 'app-list-contracheque-do-gerente',
  templateUrl: './list-contracheque-do-gerente.component.html',
  styleUrls: ['./list-contracheque-do-gerente.component.css']
})
export class ListContrachequeDoGerenteComponent implements OnInit {
  id_gerente:any
  contracheques: ContrachequeG[] = []
  modal:boolean = false
  modal2: boolean = false
  idModal: any
  descricaoModal: any
  dataModal: any
  valorModal:any
  statusModal:any
  contracheque: ContrachequeG = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:''
  }
  gerente: Gerente = {
    id_gerente:'',
    ger_vinculo:0,
    ger_nome:'',
    ger_cidade:'',
    ger_idade:'',
    ger_foto:''
  }
  filter!:string


  constructor(private contrachequeGService: ContrachequegService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private gerenteService: GerentesService) { }

  ngOnInit(): void {
    this.id_gerente = this.activatedRoute.snapshot.paramMap.get('id_gerente')
    console.log(this.id_gerente);

    this.buscarContrachequesDoGerente()
    this.buscarUmGerente()
  }

  buscarContrachequesDoGerente(){
    this.contrachequeGService.mostrarContrachequesDoGerente(this.id_gerente).subscribe(res =>{
      this.contracheques = res;
    })
  }

  mostrarModal(contracheque: ContrachequeG){
    this.modal = true
    this.idModal = contracheque.id_contracheque
    this.descricaoModal = contracheque.cc_descricao
    this.dataModal = contracheque.cc_data_emissao
    this.valorModal = contracheque.cc_valor
    this.statusModal = contracheque.cc_status
    console.log(this.idModal);

  }

  deletarContracheque(){
    this.contrachequeGService.deletarContracheque(this.idModal).subscribe({
      next: () => {alert("Contracheque deletado com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/funcionarios/contracheque/${this.id_gerente}`])})},
      error: () => {alert("Erro ao deletar contracheque!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/funcionarios/contracheque/${this.id_gerente}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  mostrarModal2(contracheque: ContrachequeG){
    this.modal2 = true
    this.idModal = contracheque.id_contracheque
    this.descricaoModal = contracheque.cc_descricao
    this.dataModal = contracheque.cc_data_emissao
    this.valorModal = contracheque.cc_valor
    this.statusModal = contracheque.cc_status
  }

  entregarContracheque(){
    this.contrachequeGService.entregarContracheque(this.idModal, this.contracheque).subscribe({
      next: () => {alert("Contracheque entregue com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/gerente/contracheque/${this.id_gerente}`])})},
      error: () => {alert("Erro ao entregar contracheque!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/getente/contracheque/${this.id_gerente}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  buscarUmGerente(){
    this.gerenteService.buscarUmGerente(this.id_gerente).subscribe(res =>{
      this.gerente = res;
      console.log(res);

    })
  }


}
