import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
