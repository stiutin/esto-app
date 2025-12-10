import { Routes } from '@angular/router';

import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoDetailsComponent } from './pages/photos/photo-details/photo-details.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: 'cart', component: CartComponent },
  { path: 'photos/:id', component: PhotoDetailsComponent },
  { path: '**', redirectTo: '' }
];
