import { createAction, props } from "@ngrx/store";
import { Photo } from '../shared/entities/interfaces/photo';

export const addToCart = createAction(
  '[Photo] Add to Cart',
  props<{ photo: Photo }>()
);

export const loadPhotos = createAction('[Photo] Load Photos');

export const loadPhotosSuccess = createAction(
  '[Photo] Load Photos Success',
  props<{ photos: Photo[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photo] Load Photos Failure',
  props<{ error: any }>()
);

export const removeFromCart = createAction(
  '[Photo] Remove From Cart',
  props<{ photoId: number }>()
);
