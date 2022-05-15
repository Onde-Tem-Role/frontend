import { Usuario } from './Usuario';
import { Tema } from "./Tema";

export class Postagem{

  public id: number;
  public local: string;
  public texto: string;
  public data: Date;
  public foto: string;
  public contato: string;
  public valor: number;
  public tipoTurismo: string;
  public tema: Tema;
  public usuario: Usuario;

}