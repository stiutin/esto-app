import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhotoDataService } from '../core/services/photo-data.service';
import {Photo} from '../core/interfaces/photo';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {error} from 'protractor';

@UntilDestroy()
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {
  public favoritePhotos: Photo[];

  constructor(
    private photoDataService: PhotoDataService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Esto App | Favorite Photos');
  }

  public ngOnInit() {
    this.photoDataService
      .currentState
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (favorite: Photo[]) => this.favoritePhotos = favorite,
        error: () => console.log('Error')
      });
  }

}
