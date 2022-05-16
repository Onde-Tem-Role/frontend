import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alerta.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema:string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private temaService: TemaService,
    public authService: AuthService,
    private postagemService: PostagemService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {

    if(environment.token == "") {
      this.router.navigate(["/home"])
    }

    this.authService.refreshToken();
    this.getAllTemas()
    this.getAllPostagens()
    this.findByIdUsuario()
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

   findByTipoTurismo(){
     if(this.tituloPost == ''){
       this.getAllPostagens()
     } else {
       this.postagemService.getBytipoTurismo(this.tituloPost).subscribe((resp: Postagem[]) => {
         this.listaPostagem = resp
       })
     }
   }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }
  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alerta.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.getAllTemas()
    })
  }

   findByTipoTema(){
     if(this.nomeTema == ''){
       this.getAllTemas()
     } else {
       this.temaService.getByTipo(this.nomeTema).subscribe((resp: Tema[]) => {
         this.listaTemas = resp
        })
      }
     }
  }

