import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imagesData: any = [
    "assets/images/1 (1).jpg",
    "assets/images/1 (2).jpg",
    "assets/images/1 (3).jpg",
    "assets/images/1 (4).jpg",
    "assets/images/1 (5).jpg",
    "assets/images/1 (6).jpg",
    "assets/images/1 (7).jpg",
    "assets/images/1 (8).jpg",
    "assets/images/1 (9).jpg",
    "assets/images/1 (10).jpg",
    "assets/images/1 (11).jpg",
    "assets/images/1 (12).jpg",
    "assets/images/1 (13).jpg",
    "assets/images/1 (14).jpg",
    "assets/images/1 (15).jpg",
    "assets/images/1 (16).jpg"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
