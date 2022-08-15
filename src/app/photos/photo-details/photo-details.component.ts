import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Photo } from '../../core/interfaces/photo';
import { PhotoDataService } from '../../core/services/photo-data.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: [ './photo-details.component.scss' ]
})

export class PhotoDetailsComponent implements OnInit {
  @Input() photo: Photo;
  favoritePhotos: Photo[];

  constructor(
    private route: ActivatedRoute,
    private photoDataService: PhotoDataService,
    private titleService: Title
  ) {}

  public ngOnInit(): void {
    this.titleService.setTitle('Esto App | Photo');
    this.getPhoto();
    this.photoDataService
      .currentState
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (favorite: Photo[]) => this.favoritePhotos = favorite,
        error: () => console.log('Error')
      })
  }

  getPhoto(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.photoDataService.getPhoto(id).subscribe(photo => this.photo = photo);
  }

  removePhoto(photo: number): void {
    this.favoritePhotos.splice(photo, 1);
    this.photoDataService.updateFavoritesList(this.favoritePhotos);
  }
}
