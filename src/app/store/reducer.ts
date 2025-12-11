import { createReducer, on } from '@ngrx/store';
import * as PhotoActions from './actions';
import {IProduct} from "../shared/entities/interfaces/product.interface";

export interface PhotoState {
  products: IProduct[];
  productsInCart: IProduct[];
  error: any;
}

export const initialState: PhotoState = {
  products: [],
  productsInCart: [],
  error: null
};

export const photoReducer = createReducer(
  initialState,
  on(PhotoActions.loadPhotosSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(PhotoActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(PhotoActions.addToCart, (state, { product }) => ({
    ...state,
    productsInCart: [...state.productsInCart, product]
  })),
  on(PhotoActions.removeFromCart, (state, { productId }) => ({
    ...state,
    productsInCart: state.productsInCart.filter(p => p.id !== productId),
  }))
);
