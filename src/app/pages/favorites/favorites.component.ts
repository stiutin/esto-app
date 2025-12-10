import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhotoDataService } from '../../shared/services/photo-data.service';
import {Photo} from '../../shared/entities/interfaces/photo';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

import { RouterLink } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [RouterLink],
  standalone: true,
})

export class FavoritesComponent implements OnInit {
  protected favoritePhotos: Photo[];
  private photoDataService = inject(PhotoDataService);
  private titleService = inject(Title);

  constructor() {
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
