import { Component, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Photo } from '../../core/interfaces/photo';
import { PhotoDataService } from '../../core/services/photo-data.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  standalone: true,
  imports: [RouterLink]
})

export class PhotoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private photoDataService = inject(PhotoDataService);
  private titleService = inject(Title);

  @Input() photo: Photo;
  favoritePhotos: Photo[];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.titleService.setTitle('Esto App | Photo');
  }

  public ngOnInit(): void {
    this.getPhoto();
    this.photoDataService
      .currentState
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (favorite: Photo[]) => this.favoritePhotos = favorite,
        error: () => console.log('Error')
      })
  }

  public getPhoto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.photoDataService
      .getPhoto(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (photo: Photo) => this.photo = photo,
        error: () => console.log('Error')
      });
  }

  public removePhoto(photo: number): void {
    this.favoritePhotos.splice(photo, 1);
    this.photoDataService.updateFavoritesList(this.favoritePhotos);
  }
}
