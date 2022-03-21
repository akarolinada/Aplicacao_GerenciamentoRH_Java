import { AddGerenteComponent } from './views/Gerente/add-gerente/add-gerente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { EditGerenteComponent } from './views/Gerente/edit-gerente/edit-gerente.component';
import { CargoDoGerenteComponent } from './views/Gerente/cargo-do-gerente/cargo-do-gerente.component';
import { ListContrachequesDoFuncionarioComponent } from './views/Contracheque/list-contracheques-do-funcionario/list-contracheques-do-funcionario.component';
import { AddContrachequeFuncionarioComponent } from './views/Contracheque/add-contracheque-funcionario/add-contracheque-funcionario.component';
import { EditContrachequeComponent } from './views/Contracheque/edit-contracheque/edit-contracheque.component';
import { ListTasksDoCargoComponent } from './views/Tasks/list-tasks-do-cargo/list-tasks-do-cargo.component';
import { AddTasksComponent } from './views/Tasks/add-tasks/add-tasks.component';
import { EditTasksComponent } from './views/Tasks/edit-tasks/edit-tasks.component';
import { ListContrachequeDoGerenteComponent } from './views/ContrachequeG/list-contracheque-do-gerente/list-contracheque-do-gerente.component';
import { AddContrachequeDoGerenteComponent } from './views/ContrachequeG/add-contracheque-do-gerente/add-contracheque-do-gerente.component';
import { EditContrachequeDoGerenteComponent } from './views/ContrachequeG/edit-contracheque-do-gerente/edit-contracheque-do-gerente.component';
import { LoginComponent } from './Templates/login/login.component';


const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"cargo/list",component:ListCargosComponent},
  {path:"cargo/add",component:AddCargosComponent},
  {path:"cargo/edit/:id_cargo",component:EditCargosComponent},
  {path:"funcionariosCargo/list/:id_cargo/:car_nome",component:ListFuncionarioComponent},
  {path:"gerente-do-cargo/:id_cargo",component:GerenteDoCargoComponent},
  {path:"funcionarios/list",component:ListFuncionarioComCargoComponent},
  {path:"funcionarios/edit/:id_funcionario",component:EditFuncionarioComponent},
  {path:"cargo-do-funcionario/:id_funcionario/:id_cargo",component:CargoDoFuncionarioComponent},
  {path:"funcionarios/add",component:AddFuncionarioComponent},
  {path:"gerentes/list",component:ListaGerenteECargoComponent},
  {path:"gerentes/add",component:AddGerenteComponent},
  {path:"gerentes/edit/:id_gerente/:id_cargo/:ger_nome",component:EditGerenteComponent},
  {path:"cargo-do-gerente/:id_gerente/:id_cargo", component:CargoDoGerenteComponent},
  {path:"funcionarios/contracheque/:id_funcionario",component:ListContrachequesDoFuncionarioComponent},
  {path:"funcionario/contracheque/cadastro/:id_funcionario",component:AddContrachequeFuncionarioComponent},
  {path:"funcionario/contracheque/edit/:id_contracheque/:id_funcionario", component:EditContrachequeComponent},
  {path:"cargo/task/:id_cargo",component:ListTasksDoCargoComponent},
  {path:"cargo/task/cadastro/:id_cargo",component:AddTasksComponent},
  {path:"cargo/task/edit/:id_task/:id_cargo",component:EditTasksComponent},
  {path:"gerente/contracheque/:id_gerente", component:ListContrachequeDoGerenteComponent},
  {path:"gerente/contracheque/cadastro/:id_gerente",component:AddContrachequeDoGerenteComponent},
  {path:"gerente/contracheque/edit/:id_gerente",component:EditContrachequeDoGerenteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
