import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../../../Services/funcionarios.service';
import { Funcionario } from '../../../Models/FuncionarioModel';
import { Router } from '@angular/router';
import { Gerente } from 'src/app/Models/GerenteModel';
import { GerentesService } from '../../../Services/gerentes.service';
import { ContrachequeService } from '../../../Services/contracheque.service';
import { ContrachequegService } from '../../../Services/contrachequeg.service';
import { ContrachequeG } from '../../../Models/ContrachequeGModel';

@Component({
  selector: 'app-list-funcionario-com-cargo',
  templateUrl: './list-funcionario-com-cargo.component.html',
  styleUrls: ['./list-funcionario-com-cargo.component.css'],
})
export class ListFuncionarioComCargoComponent implements OnInit {
  funcionario: any = [];
  modal: boolean = false
  idVinculo: any;
  nomeVinculo: any;
  cidadeVinculo: any;
  cargoVinculo: any;
  botaoVinculo: any;
  gerente: Gerente = {
    ger_nome: '',
    ger_cidade: '',
    ger_vinculo: 1
  }
  filter!: string;


  constructor(private funcionarioService: FuncionariosService, private gerenteService: GerentesService, private contrachequeService: ContrachequeService, private contrachequegService: ContrachequegService, private router: Router) { }

  ngOnInit(): void {
    this.buscaTodosFuncionarios();
  }

  buscaTodosFuncionarios() {
    this.funcionarioService.buscaTodosFuncionarios().subscribe((res) => {
      console.log(res);
      res.forEach((element: any[]) => {

        let funcionarios: Funcionario = {
          id_funcionario: '',
          func_nome: '',
          func_cidade: '',
          id_cargo: '',
          car_nome: '',
          func_vinculo: 0,
        };

        funcionarios.id_funcionario = element[0];
        funcionarios.func_nome = element[1];
        funcionarios.func_cidade = element[2];
        if (element[3] != null) {
          funcionarios.id_cargo = element[3]
        } else {
          funcionarios.id_cargo = 0
        }
        funcionarios.car_nome = element[4]
        funcionarios.func_vinculo = element[6];

        this.funcionario.push(funcionarios);
      });
    });
  }

  mostrarModal(funcionario: Funcionario) {
    this.modal = true
    this.idVinculo = funcionario.id_funcionario
    this.nomeVinculo = funcionario.func_nome
    this.cidadeVinculo = funcionario.func_cidade
    this.cargoVinculo = funcionario.car_nome
    this.botaoVinculo = funcionario.func_vinculo
  }

  desvincularFuncionario() {
    this.funcionarioService.vinculoFunc(this.idVinculo, this.funcionario).subscribe({
      next: () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/funcionarios/list'])
        })
      },
      error: () => { alert('Erro ao desvincular funcionário') },
      complete: () => {
        console.log('Complete!');
      }
    })
  }

  vincularFuncionario() {
    this.funcionarioService.vinculoFunc(this.idVinculo, this.funcionario).subscribe({
      next: () => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/funcionarios/list'])
        })
      },
      error: () => { alert('Erro ao vincular funcionário') },
      complete: () => {
        console.log('Complete!');
      }
    })
  }

  promoverFuncionario(funcionario: Funcionario) {
    this.gerente.ger_nome = funcionario.func_nome
    this.gerente.ger_cidade = funcionario.func_cidade
    this.gerente.ger_vinculo = funcionario.func_vinculo
    this.gerente.id_cargo = funcionario.id_cargo
    this.gerenteService.cadastrarGerente(this.gerente).subscribe(res => {
      console.log("Funcionario inserido!")
      this.gerenteService.buscaFuncionarioPromovido().subscribe(res => {
        console.log(res);

        this.contrachequeService.mostrarContrachequesDoFuncionario(funcionario.id_funcionario).subscribe(res2 => {
          res2.forEach(e => {
            let contrachequeg: ContrachequeG = {
              cc_descricao: '',
              cc_data_emissao: '',
              cc_valor: '',
              cc_status: '',
              id_gerente: ''
            }

            contrachequeg.cc_descricao = e.cc_descricao
            contrachequeg.cc_data_emissao = e.cc_data_emissao
            contrachequeg.cc_valor = e.cc_valor
            contrachequeg.cc_status = e.cc_status
            contrachequeg.id_gerente = res.id_gerente

            console.log(contrachequeg);

            this.contrachequegService.adicionarContracheque(res.id_gerente, contrachequeg).subscribe(res => {
              console.log("CC transferidos!")
            })
          })
        })
      })
      this.funcionarioService.deletarFuncionario(funcionario.id_funcionario).subscribe(res => {
        alert("Funcionario promovido!");
        this.router.navigate(['/gerentes/list'])
      })
    })
  }
}
