import { Component, OnInit, HostListener, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {AsyncPipe, SlicePipe} from '@angular/common';
import { Photo } from '../../shared/entities/interfaces/photo';
import * as PhotoActions from '../../store/actions';
import * as PhotoSelectors from '../../store/selectors';
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  imports: [SlicePipe, AsyncPipe],
  standalone: true,
})

export class PhotosComponent implements OnInit {
  private store = inject(Store);
  protected photos$: Observable<Photo[]> = this.store.select(PhotoSelectors.selectPhotos);
  protected favoritePhotos$: Observable<Photo[]> = this.store.select(PhotoSelectors.selectFavoritePhotos);
  protected visibleImages = 9;
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Esto App | Home');
  }

  public ngOnInit(): void {
    this.store.dispatch(PhotoActions.loadPhotos());
  }

  protected favoriteIds$ = this.favoritePhotos$.pipe(
    map(favs => favs.map(f => f.id))
  );

  protected isFavorite(photoId: number, favoriteIds: number[]): boolean {
    return favoriteIds.includes(photoId);
  }

  protected addToFav(photo: Photo, event: MouseEvent): void {
    this.store.dispatch(PhotoActions.addToCart({ photo }));
    (event.target as HTMLButtonElement).disabled = true;
  }

  protected increaseVisibleImagesByClick(): void {
    this.visibleImages += 1;
  }

  private increaseVisibleImagesCounter(): void {
    this.visibleImages += 1;
  }

  @HostListener('window:scroll')
  public increaseVisibleImagesByScroll(): void {
    setTimeout(() => {
      this.increaseVisibleImagesCounter();
    }, 300);
  }
}
