import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './actions';
import {IProduct} from "../shared/entities/interfaces/product.interface";

export interface PhotoState {
  photos: IProduct[];
  favoritePhotos: IProduct[];
  error: any;
}

export const initialState: PhotoState = {
  photos: [],
  favoritePhotos: [],
  error: null
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.loadPhotosSuccess, (state, { photos }) => ({
    ...state,
    photos
  })),
  on(PhotoActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(PhotoActions.addToCart, (state, { photo }) => ({
    ...state,
    favoritePhotos: [...state.favoritePhotos, photo]
  })),
  on(PhotoActions.removeFromCart, (state, { photoId }) => ({
    ...state,
    favoritePhotos: state.favoritePhotos.filter(p => p.id !== photoId),
  }))
);
