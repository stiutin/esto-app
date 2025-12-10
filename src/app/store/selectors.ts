import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotoState } from './reducer';
import {Photo} from "../shared/entities/interfaces/photo";

export const selectPhotoState = createFeatureSelector<PhotoState>('photos');

export const selectPhotos = createSelector(
  selectPhotoState,
  state => state.photos
);

export const selectFavoritePhotos = createSelector(
  selectPhotoState,
  state => state.favoritePhotos
);

export const selectPhotoById = (photoId: number) => createSelector(
  selectPhotoState,
  (state): Photo | undefined => state.photos.find(p => p.id === photoId)
);
