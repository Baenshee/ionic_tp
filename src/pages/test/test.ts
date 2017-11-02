import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {Base64ToGallery} from '@ionic-native/base64-to-gallery';
import {LoadingController} from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from '@ionic-native/media-capture';
import {VideoPlayer} from '@ionic-native/video-player';

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
  public videoData: string;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              private base64ToGallery: Base64ToGallery,
              private loadingController: LoadingController,
              private localNotifications: LocalNotifications,
              private mediaCapture: MediaCapture,
              private videoPlayer: VideoPlayer) {
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
          res => {
            loading.dismiss();
            this.localNotifications.schedule({
              id: 1,
              text: 'Saved'
            })
          },
          err => console.log('Error saving image to gallery ', err)
        );
      }
    );
  }

  takeVideo() {
    let options: CaptureImageOptions = {limit: 1};
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => this.videoData = data[0].fullPath,
        (err: CaptureError) => alert(err)
      );
  }

}
