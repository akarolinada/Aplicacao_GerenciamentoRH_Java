import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt'
import { NgxCurrencyModule } from "ngx-currency";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Templates/footer/footer.component';
import { HeaderComponent } from './Templates/header/header.component';
import { HomeComponent } from './Templates/home/home.component';
import { AddCargosComponent } from './views/Cargos/add-cargos/add-cargos.component';
import { EditCargosComponent } from './views/Cargos/edit-cargos/edit-cargos.component';
import { ListCargosComponent } from './views/Cargos/list-cargos/list-cargos.component';
import { ListFuncionarioComponent } from './views/Cargos/list-funcionario/list-funcionario.component';
import { GerenteDoCargoComponent } from './views/Cargos/gerente-do-cargo/gerente-do-cargo.component';
import { ListFuncionarioComCargoComponent } from './views/Funcionarios/list-funcionario-com-cargo/list-funcionario-com-cargo.component';
import { EditFuncionarioComponent } from './views/Funcionarios/edit-funcionario/edit-funcionario.component';
import { CargoDoFuncionarioComponent } from './views/Funcionarios/cargo-do-funcionario/cargo-do-funcionario.component';
import { AddFuncionarioComponent } from './views/Funcionarios/add-funcionario/add-funcionario.component';
import { ListaGerenteECargoComponent } from './views/Gerente/lista-gerente-e-cargo/lista-gerente-e-cargo.component';
import { AddGerenteComponent } from './views/Gerente/add-gerente/add-gerente.component';
import { EditGerenteComponent } from './views/Gerente/edit-gerente/edit-gerente.component';
import { CargoDoGerenteComponent } from './views/Gerente/cargo-do-gerente/cargo-do-gerente.component';
import { ListContrachequesDoFuncionarioComponent } from './views/Contracheque/list-contracheques-do-funcionario/list-contracheques-do-funcionario.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { AddContrachequeFuncionarioComponent } from './views/Contracheque/add-contracheque-funcionario/add-contracheque-funcionario.component';
import { EditContrachequeComponent } from './views/Contracheque/edit-contracheque/edit-contracheque.component';
import { ListTasksDoCargoComponent } from './views/Tasks/list-tasks-do-cargo/list-tasks-do-cargo.component';
import { AddTasksComponent } from './views/Tasks/add-tasks/add-tasks.component';
import { EditTasksComponent } from './views/Tasks/edit-tasks/edit-tasks.component';
import { ListContrachequeDoGerenteComponent } from './views/ContrachequeG/list-contracheque-do-gerente/list-contracheque-do-gerente.component';
import { AddContrachequeDoGerenteComponent } from './views/ContrachequeG/add-contracheque-do-gerente/add-contracheque-do-gerente.component';
import { EditContrachequeDoGerenteComponent } from './views/ContrachequeG/edit-contracheque-do-gerente/edit-contracheque-do-gerente.component';
import { LoginComponent } from './Templates/login/login.component';

registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListCargosComponent,
    HomeComponent,
    EditCargosComponent,
    AddCargosComponent,
    ListFuncionarioComponent,
    GerenteDoCargoComponent,
    ListFuncionarioComCargoComponent,
    EditFuncionarioComponent,
    CargoDoFuncionarioComponent,
    AddFuncionarioComponent,
    ListaGerenteECargoComponent,
    AddGerenteComponent,
    EditGerenteComponent,
    CargoDoGerenteComponent,
    ListContrachequesDoFuncionarioComponent,
    AddContrachequeFuncionarioComponent,
    EditContrachequeComponent,
    ListTasksDoCargoComponent,
    AddTasksComponent,
    EditTasksComponent,
    ListContrachequeDoGerenteComponent,
    AddContrachequeDoGerenteComponent,
    EditContrachequeDoGerenteComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxCurrencyModule,
    Ng2SearchPipeModule
  ],
  providers: [{provide: LOCALE_ID, useValue: "pt-BR"},
              {provide: DEFAULT_CURRENCY_CODE, useValue: "BRL"},
               CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
