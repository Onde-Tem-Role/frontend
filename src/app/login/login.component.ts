import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin();

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
    ) {}

  ngOnInit(): void {
    window.scroll(0,0);
  }

  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;
        this.alertas.showAlertSuccess('Usuario Logado com Sucesso');
        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;
        environment.tipo = this.usuarioLogin.tipo;
        this.router.navigate(['/inicio']);
      },
      error: (erro) => {
        if (erro.status == 401) {
          this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
        }
      },
    });
  }
  validaEmail() {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(this.usuarioLogin.usuario.match(regex)) {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'green';
      usuario.style.boxShadow = '0 0 1em green';
    } else {
      let usuario = (<HTMLDivElement>document.querySelector('#usuario'))
      usuario.style.borderColor = 'red';
      usuario.style.boxShadow = '0 0 1em red';
    }
  }
}
