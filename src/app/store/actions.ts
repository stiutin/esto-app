import { createAction, props } from "@ngrx/store";
import {IProduct} from "../shared/entities/interfaces/product.interface";

export const addToCart = createAction(
  '[Product] Add to Cart',
  props<{ product: IProduct }>()
);

export const loadPhotos = createAction('[Photo] Load Photos');

export const loadPhotosSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: IProduct[] }>()
);

export const loadPhotosFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const removeFromCart = createAction(
  '[Product] Remove From Cart',
  props<{ productId: number }>()
);
