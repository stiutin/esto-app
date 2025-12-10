import { Component, OnInit, inject } from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {map, Observable} from 'rxjs';
import {UntilDestroy} from "@ngneat/until-destroy";
import * as PhotoActions from '../../store/actions';
import * as PhotoSelectors from '../../store/selectors';
import {IProduct} from "../../shared/entities/interfaces/product.interface";

@UntilDestroy()
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  imports: [AsyncPipe],
  standalone: true,
})

export class PhotosComponent implements OnInit {
  private store = inject(Store);
  protected photos$: Observable<IProduct[]> = this.store.select(PhotoSelectors.selectPhotos);
  protected favoritePhotos$: Observable<IProduct[]> = this.store.select(PhotoSelectors.selectFavoritePhotos);
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

  protected addToFav(photo: IProduct, event: MouseEvent): void {
    this.store.dispatch(PhotoActions.addToCart({ photo }));
    (event.target as HTMLButtonElement).disabled = true;
  }
}
