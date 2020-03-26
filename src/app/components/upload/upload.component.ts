import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { ImagesLoadService } from 'src/app/services/images-load.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styles: []
})
export class UploadComponent implements OnInit {
  isOverElement = false;
  files: FileItem[] = [];

  constructor(public imagesLoadService: ImagesLoadService) {}

  ngOnInit(): void {}

  loadImages() {
    this.imagesLoadService.loadImagesFireBase(this.files);
  }

  testOverElement(event) {
    console.log(event);
  }

  cleanFiles() {
    this.files = [];
  }
}
