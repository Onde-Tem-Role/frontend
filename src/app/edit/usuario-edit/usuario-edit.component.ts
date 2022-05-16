import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alerta: AlertasService

    ) { }

    ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  validaSenha() {
    let txtSenha = <HTMLLabelElement>document.querySelector('#txtSenha');
    let senha = <HTMLInputElement>document.querySelector('#senha');
    let confSenha = <HTMLInputElement>document.querySelector('#confirmarSenha');

    if (this.confirmarSenha == this.usuario.senha) {
      txtSenha.innerHTML = 'Confirme sua senha';
      senha.style.border = 'solid 1px green';
      confSenha.style.border = 'solid 1px green';
    } else {
      txtSenha.innerHTML = 'Senhas não são identicas!';
      senha.style.border = 'solid 1px red';
      confSenha.style.border = 'solid 1px red';
    }
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario;
    console.log(this.usuario)
    if (this.usuario.senha != this.confirmarSenha) {
      this.alerta.showAlertDanger('As senhas não conferem');

    } else {
      this.authService.atualizar(this.usuario).subscribe({
        next: (resp: Usuario) => {
          this.usuario = resp;
          this.alerta.showAlertSuccess('Usuario Atualizado com sucesso! Por favor faça o login para validar as alterações');
          this.router.navigate(['/login']);
          environment.token = '';
          environment.foto = '';
          environment.id = 0;
          environment.nome = '';
        },
        error: (erro) => {
          if (erro.status == 400) {
            this.alerta.showAlertInfo('Preencha os campos corretamente para atualizar o usuario');
          }
        },
      });
    }

  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
      this.usuario.senha = ''
    })
  }
}
