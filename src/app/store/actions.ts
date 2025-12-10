import { createAction, props } from "@ngrx/store";
import {IProduct} from "../shared/entities/interfaces/product.interface";

export const addToCart = createAction(
  '[Photo] Add to Cart',
  props<{ photo: IProduct }>()
);

export const loadPhotos = createAction('[Photo] Load Photos');

export const loadPhotosSuccess = createAction(
  '[Photo] Load Photos Success',
  props<{ photos: IProduct[] }>()
);

export const loadPhotosFailure = createAction(
  '[Photo] Load Photos Failure',
  props<{ error: any }>()
);

export const removeFromCart = createAction(
  '[Photo] Remove From Cart',
  props<{ photoId: number }>()
);
