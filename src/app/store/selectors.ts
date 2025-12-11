import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PhotoState } from './reducer';
import {IProduct} from "../shared/entities/interfaces/product.interface";

export const selectPhotoState = createFeatureSelector<PhotoState>('photos');

export const selectPhotos = createSelector(
  selectPhotoState,
  state => state.products
);

export const selectFavoritePhotos = createSelector(
  selectPhotoState,
  state => state.productsInCart
);

export const selectPhotoById = (productId: number) => createSelector(
  selectPhotoState,
  (state): IProduct | undefined => state.products.find(p => p.id === productId)
);
