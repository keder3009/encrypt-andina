import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EncriptacionService } from "../services/encriptacion.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public show: boolean = false;

  public usuario:any = {
    usuario: "",
    clave: ""
  }

  public cifradoUser: string = "Simetrico";
  public cifradoPass: string = "Asimetrico";

  public usuarios: any = []
  public usuariosSinCifrar: any = []

  constructor(private toastCtrl: ToastController, private encriptacion: EncriptacionService) {}

  addUser(){
    if (this.usuario.usuario == "" || this.usuario.clave == "") {
      this.toastAndina('Debes llenar todos los datos', 'danger')
    }else{
      this.usuarios.push(this.usuario);
      this.usuariosSinCifrar.push({nombre: this.usuario.usuario, pass: this.usuario.clave})
      this.usuario = {
        usuario: "",
        clave: ""
      }
      this.toastAndina('Usuario agregado', 'andina')
    }
  }

  chageSimetrico(){
    switch (this.cifradoUser) {
      case "cesar":
        for (let i = 0; i < this.usuariosSinCifrar.length; i++) {
          this.usuarios[i].usuario = this.encriptacion.cesar(this.usuariosSinCifrar[i].nombre)
        }
        break;
        
        case "blowfish":
          for (let i = 0; i < this.usuariosSinCifrar.length; i++) {
            this.usuarios[i].usuario = this.encriptacion.cifradoBlowfish(this.usuariosSinCifrar[i].nombre)
          }
          break;

        case "rsa":
          for (let i = 0; i < this.usuariosSinCifrar.length; i++) {
            this.usuarios[i].usuario = this.encriptacion.cifradoRsa(this.usuariosSinCifrar[i].nombre)
          }
          break;
      default:
        break;
    }
  }

  chageAsimetrico(){
    switch (this.cifradoPass) {
        case "rsa":
          for (let i = 0; i < this.usuariosSinCifrar.length; i++) {
            this.usuarios[i].clave = this.encriptacion.cifradoRsa(this.usuariosSinCifrar[i].pass)
          }
          break;
      default:
        break;
    }
  }

  async toastAndina(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }
}
