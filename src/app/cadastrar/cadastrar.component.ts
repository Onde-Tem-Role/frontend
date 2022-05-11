import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  usuario: Usuario = new Usuario()
  confirmarSenha: string
  tipoDeUsuario: string

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoDeUsuario = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoDeUsuario
    if (this.usuario.senha != this.confirmarSenha) {
      alert('As senhas não conferem')
    } else {
      this.auth.cadastrar(this.usuario).subscribe({
        next: (resp: Usuario) =>{
        this.usuario = resp
        alert('Usuario Cadastrado com sucesso!')
        this.router.navigate(['/login']);
        }
        })
  }
}

    validaEmail() {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if(this.usuario.usuario.match(regex)) {
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
