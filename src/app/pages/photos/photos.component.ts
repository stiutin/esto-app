import { Component, OnInit, HostListener, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { SlicePipe } from '@angular/common';
import {PhotoDataService} from "../../shared/services/photo-data.service";
import {Photo} from "../../shared/entities/interfaces/photo";

@UntilDestroy()
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  imports: [SlicePipe],
  standalone: true,
})

export class PhotosComponent implements OnInit {
  private photoDataService = inject(PhotoDataService);
  private titleService = inject(Title);

  public photos: Photo[] = [];
  public favoritePhotos: Photo[];
  public visibleImages = 9;

  constructor() {
    this.titleService.setTitle('Esto App | Home');
  }

  public ngOnInit(): void {
    this.getPhotos();
    this.photoDataService
      .currentState
      .pipe(untilDestroyed(this))
      .subscribe(favorite => this.favoritePhotos = favorite);
  }

  public getPhotos(): void {
    this.photoDataService
      .getPhotosList()
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

  public increaseVisibleImagesByClick(): void {
    this.visibleImages += 1;
  }

  public increaseVisibleImagesCounter(): void {
    this.visibleImages += 1;
  }

  @HostListener('window:scroll')
  public increaseVisibleImagesByScroll(): void {
    setTimeout(() => { this.increaseVisibleImagesCounter() }, 300);
  }

}
