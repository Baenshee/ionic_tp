import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {LoadingController} from 'ionic-angular';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  public base64Image: string;
  public imageData: string;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              private base64ToGallery: Base64ToGallery,
              private loadingController: LoadingController) {
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.imageData = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  savePicture() {
    let loading = this.loadingController.create({content: "Saving..."});
    loading.present().then(() => {
        this.base64ToGallery.base64ToGallery(this.imageData, {prefix: '_img'}).then(
          res => loading.dismiss(),
          err => console.log('Error saving image to gallery ', err)
        );
      }
    );
  }

}
