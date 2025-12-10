import { Routes } from '@angular/router';

import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoDetailsComponent } from './pages/photos/photo-details/photo-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: PhotosComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailsComponent },
  { path: '**', redirectTo: '' }
];
