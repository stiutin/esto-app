import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import {RouterModule} from '@angular/router';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule, HeaderComponent,
        PhotosComponent,
        FavoritesComponent,
        PhotoDetailsComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
