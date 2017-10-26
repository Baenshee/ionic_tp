import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  app: any = { name: String, version: Number};
  constructor(public navCtrl: NavController, public camera: Camera) {
    this.app.name = "AppName";
    this.app.version = "0.0.1";
  }



}
