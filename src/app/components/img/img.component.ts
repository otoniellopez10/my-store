import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges {
  img: string = '';
  @Input('img')
  set changeImage(newImg: string) {
    this.img = newImg
  }
  @Output() loaded = new EventEmitter<string>();
  imageDefault: string = './assets/images/default.jpg';

  constructor() { }

  ngOnChanges() {

  }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img)
  }

}
