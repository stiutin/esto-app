import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Photo } from '../../shared/entities/interfaces/photo';
import * as PhotoSelectors from '../../store/selectors';
import { RouterLink } from '@angular/router';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [RouterLink, AsyncPipe],
  standalone: true,
})
export class CartComponent {
  private readonly store = inject(Store);
  protected favoritePhotos$: Observable<Photo[]> = this.store.select(PhotoSelectors.selectFavoritePhotos);
  private readonly titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Esto App | Cart');
  }
}
