import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styles: []
})
export class PhotosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
