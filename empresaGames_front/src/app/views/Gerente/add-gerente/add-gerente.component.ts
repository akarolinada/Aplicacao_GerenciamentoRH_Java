import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/app/Models/GerenteModel';
import { GerentesService } from '../../../Services/gerentes.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-gerente',
  templateUrl: './add-gerente.component.html',
  styleUrls: ['./add-gerente.component.css']
})
export class AddGerenteComponent implements OnInit {

  gerente: Gerente = {
    id_gerente:'',
    ger_nome:'',
    ger_cidade:'',
    ger_idade:'',
    ger_foto:'',
    id_cargo:''
  }
  gerenteCadastrado: boolean = false
  foto:any
  idGerenteCadastrado:any
  FotoModal: any

  constructor(private gerenteService: GerentesService,
              private router: Router,
              private http:HttpClient) { }

  ngOnInit(): void {
  }

  cadastrarGerente(){
    this.gerenteService.cadastrarGerente(this.gerente).subscribe({
      next: () => {alert("Líder Cadastrado com sucesso!")
                   this.gerenteCadastrado = true
                   this.gerenteService.buscarGerentePeloNome(this.gerente.ger_nome)
                   .subscribe(resultado =>{
                     console.log(resultado)
                     this.idGerenteCadastrado = resultado.id_gerente
                     this.gerenteCadastrado = true
                   })},
      error: () => {alert("Erro ao cadastrar Líder!")
                    this.router.navigate(['/gerentes/list'])},
      complete: () => {console.log("Complete!");
      }
    })
  }

  subirFoto(event:any){

    if(event.target.files && event.target.files[0]){
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto",this.foto)

      const nome:string = this.gerente.ger_nome + "-" + event.target.files[0].name

      //`http://` + localBanco + `:8080/arrozApp/send/?nome=` + nomeFoto
      //http://localhost:8080/escola/envio/3?nome=yyyyyyyyy
      this.http.post(`http://localhost:8081/empresaGames/envio/${this.idGerenteCadastrado}?nome=${nome}`,formData).subscribe({
        next: () => console.log("Foto enviada")
      })

      alert("Foto anexada ao Líder")

      this.router.navigate(['/gerentes/list']);


    }


  }



}
