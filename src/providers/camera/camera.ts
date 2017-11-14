import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class CameraProxy extends Camera {
  constructor() {
    super()
  }
  getPicture(options?: CameraOptions): Promise<any> {
    const defaultOptions: CameraOptions = {
      quality: 75,
      destinationType: this.EncodingType.JPEG,
      encodingType: this.EncodingType.JPEG,
      mediaType: this.MediaType.PICTURE
    }
    return super.getPicture(defaultOptions);
  }
}
