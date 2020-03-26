import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FileItem } from '../models/file-item';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ImagesLoadService {
  private IMAGES_FOLDER = 'img';

  constructor(private db: AngularFirestore) {}

  private saveImages(imagen: { name: string; url: string }) {
    this.db.collection(`/${this.IMAGES_FOLDER}`).add(imagen);
  }

  loadImagesFireBase(images: FileItem[]) {
    const storageRef = firebase.storage().ref();
    for (const item of images) {
      item.isLoading = true;
      if (item.progress >= 100) {
        continue;
      }
      const uploadTask: firebase.storage.UploadTask = storageRef
        .child(`${this.IMAGES_FOLDER}/${item.fileName}`)
        .put(item.file);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) =>
          (item.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
        error => console.error('Error upload', error),
        async () => {
          console.log('Properly loaded image');
          item.url = await uploadTask.snapshot.ref.getDownloadURL();
          item.isLoading = false;
          this.saveImages({ name: item.fileName, url: item.url });
        }
      );
    }
  }
}
