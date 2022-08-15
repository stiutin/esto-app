import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Photo } from '../core/interfaces/photo';
import { PhotoDataService } from '../core/services/photo-data.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})

@UntilDestroy()
export class PhotosComponent implements OnInit {
  public photos: Photo[] = [];
  public favoritePhotos: Photo[];
  public visibleImages: number = 9;

  constructor(
    private photoDataService: PhotoDataService,
    private titleService: Title
  ) { }

  public ngOnInit(): void {
    this.titleService.setTitle('Esto App | Home');
    this.getPhotos();
    this.photoDataService
      .currentState
      .pipe(untilDestroyed(this))
      .subscribe(favorite => this.favoritePhotos = favorite);
  }

  public getPhotos(): void {
    this.photoDataService
      .getPhotos()
      .pipe(untilDestroyed(this))
      .subscribe(data => this.photos = data);
  }

  public addToFav(photo: Photo, event: MouseEvent): void {
    this.favoritePhotos = this.favoritePhotos || [];
    let selectedItem = this.photos.find((res: Photo) => res.id === photo.id);
    this.favoritePhotos.push(selectedItem);
    this.photoDataService.updateFavoritesList(this.favoritePhotos);
    (event.target as HTMLButtonElement).disabled = true;
  }

  increaseVisibleImagesByClick(): void {
    this.visibleImages += 1;
  }

  increaseVisibleImagesCounter(): void {
    this.visibleImages += 1;
  }

  @HostListener('window:scroll')
  increaseVisibleImagesByScroll(): void {
    setTimeout(() => { this.increaseVisibleImagesCounter() }, 300);
  }

}
