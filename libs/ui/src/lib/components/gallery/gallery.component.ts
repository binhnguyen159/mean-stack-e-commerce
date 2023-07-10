import { Component, OnDestroy, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  selectedImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-p1MCxsGjG3HdVQbFbHgOmAY_ZV2UeUOXQ&usqp=CAU';
  @Input() images: string[] = [];

  // constructor() {}

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.selectedImage = this.images[0];
    }
    // throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    console.log('destroy component ui-gallery');
    // throw new Error('Method not implemented.');
  }

  handleChangeSelectionImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }
}
