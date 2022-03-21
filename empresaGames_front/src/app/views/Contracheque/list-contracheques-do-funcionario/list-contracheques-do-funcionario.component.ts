import { Contracheque } from './../../../Models/ContrachequeModel';
import { Component, OnInit } from '@angular/core';
import { ContrachequeService } from '../../../Services/contracheque.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from 'src/app/Services/funcionarios.service';
import { Funcionario } from '../../../Models/FuncionarioModel';

@Component({
  selector: 'app-list-contracheques-do-funcionario',
  templateUrl: './list-contracheques-do-funcionario.component.html',
  styleUrls: ['./list-contracheques-do-funcionario.component.css']
})
export class ListContrachequesDoFuncionarioComponent implements OnInit {

  id_funcionario:any
  contracheques: Contracheque[] = []
  modal:boolean = false
  modal2: boolean = false
  idModal: any
  descricaoModal: any
  dataModal: any
  valorModal:any
  statusModal:any
  contracheque: Contracheque = {
    id_contracheque:'',
    cc_descricao:'',
    cc_data_emissao:'',
    cc_valor:'',
    cc_status:''
  }
  funcionario: Funcionario = {
    id_funcionario:'',
    func_vinculo:0,
    func_nome:'',
    func_cidade:''
  }
  filter!:string


  constructor(private contrachequeService: ContrachequeService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private funcionarioService: FuncionariosService) { }

  ngOnInit(): void {
    this.id_funcionario = this.activatedRoute.snapshot.paramMap.get('id_funcionario')
    this.buscarContrachequesDoFuncionario()
    this.buscarUmFuncionario()
  }

  buscarContrachequesDoFuncionario(){
    this.contrachequeService.mostrarContrachequesDoFuncionario(this.id_funcionario).subscribe(res =>{
      this.contracheques = res;
    })
  }

  mostrarModal(contracheque: Contracheque){
    this.modal = true
    this.idModal = contracheque.id_contracheque
    this.descricaoModal = contracheque.cc_descricao
    this.dataModal = contracheque.cc_data_emissao
    this.valorModal = contracheque.cc_valor
    this.statusModal = contracheque.cc_status
    console.log(this.idModal);

  }

  deletarContracheque(){
    this.contrachequeService.deletarContracheque(this.idModal).subscribe({
      next: () => {alert("Contracheque deletado com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])})},
      error: () => {alert("Erro ao deletar contracheque!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  mostrarModal2(contracheque: Contracheque){
    this.modal2 = true
    this.idModal = contracheque.id_contracheque
    this.descricaoModal = contracheque.cc_descricao
    this.dataModal = contracheque.cc_data_emissao
    this.valorModal = contracheque.cc_valor
    this.statusModal = contracheque.cc_status
  }

  entregarContracheque(){
    this.contrachequeService.entregarContracheque(this.idModal, this.contracheque).subscribe({
      next: () => {alert("Contracheque entregue com sucesso!")
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])})},
      error: () => {alert("Erro ao entregar contracheque!")
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate([`/funcionarios/contracheque/${this.id_funcionario}`])})},
      complete: () => {console.log("complete!")}
    })
  }

  buscarUmFuncionario(){
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(res =>{
      this.funcionario = res;
      console.log(res);

    })
  }





}
