import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotoDataService } from '../shared/services/photo-data.service';
import * as PhotoActions from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PhotoEffects {
  constructor(private actions$: Actions, private photoService: PhotoDataService) {}

  loadPhotos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhotoActions.loadPhotos),
      mergeMap(() =>
        this.photoService.getPhotosList().pipe(
          map(photos => PhotoActions.loadPhotosSuccess({ photos })),
          catchError(error => of(PhotoActions.loadPhotosFailure({ error })))
        )
      )
    )
  );
}
