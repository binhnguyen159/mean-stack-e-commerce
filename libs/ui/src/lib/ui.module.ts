import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

const UI_MODULE = [ButtonModule];
@NgModule({
  imports: [CommonModule, ...UI_MODULE],
  declarations: [
    BannerComponent,
    SliderComponent,
    BannerComponent,
    GalleryComponent
  ],
  exports: [BannerComponent, SliderComponent, BannerComponent, GalleryComponent]
})
export class UiModule {}
