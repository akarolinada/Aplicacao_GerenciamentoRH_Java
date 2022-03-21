import { Component, OnInit } from '@angular/core';
import { GerentesService } from '../../../Services/gerentes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Gerente } from '../../../Models/GerenteModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-gerente',
  templateUrl: './edit-gerente.component.html',
  styleUrls: ['./edit-gerente.component.css']
})
export class EditGerenteComponent implements OnInit {

  id_gerente:any
  gerente: Gerente = {
    id_gerente:'',
    ger_nome:'',
    ger_cidade:'',
    ger_idade:'',
    ger_foto:'',
    id_cargo:'',
    ger_vinculo:1
  }
  id_cargo:any;
  ger_nome:any;
  gerenteEditado: boolean = false
  foto:any
  idGerenteEditado:any

  constructor(private gerenteService: GerentesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.id_gerente = this.activatedRoute.snapshot.paramMap.get('id_gerente')
    this.id_cargo = this.activatedRoute.snapshot.paramMap.get('id_cargo')
    this.ger_nome = this.activatedRoute.snapshot.paramMap.get('ger_nome')
    console.log(this.id_cargo);

    this.mostrarUmGerente()
  }

  mostrarUmGerente(){
    this.gerenteService.buscarGerentePeloNome(this.ger_nome).subscribe(res => {
      this.gerente = res;
      console.log(this.gerente);

    })
  }

  editarGerente(){
    this.gerenteService.editarGerente(this.id_gerente, this.gerente).subscribe({
      next: () => {alert("Líder editado com sucesso!")
                   this.gerenteEditado = true
                  this.gerenteService.buscarGerentePeloNome(this.gerente.ger_nome).subscribe(res => {
                    this.idGerenteEditado = res.id_gerente
                    console.log(this.idGerenteEditado);
                    this.gerenteEditado = true
                    this.gerente.id_cargo = this.id_cargo

                  })},
      error: () => {alert("Erro ao editar Líder!")
                    this.router.navigate(['/gerentes/list'])},
      complete: () => {console.log("complete!")}
    })
  }

  editarFoto(event:any){

    if(event.target.files && event.target.files[0]){
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto",this.foto)

      const nome:string = this.gerente.ger_nome + "-" + event.target.files[0].name

      //`http://` + localBanco + `:8080/arrozApp/send/?nome=` + nomeFoto
      //http://localhost:8080/escola/envio/3?nome=yyyyyyyyy
      this.http.post(`http://localhost:8081/empresaGames/envio/${this.idGerenteEditado}?nome=${nome}`,formData).subscribe({
        next: () => console.log("Foto editada")
      })

      alert("Foto do Líder editada!")
    }
  }
}
