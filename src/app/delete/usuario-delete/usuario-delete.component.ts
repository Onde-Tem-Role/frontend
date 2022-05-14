import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alerta.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  //nome =environment.nome

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService,
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/home'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  findByIdUsuario(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  apagar() {
    this.authService.deleteUsuario(this.idUsuario).subscribe(() => {
      this.alertas.showAlertSuccess('Usuário apagado com sucesso!')
      this.router.navigate(['/home'])
    })
  }

}
