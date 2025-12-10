import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideStore} from "@ngrx/store";
import {photoReducer} from "./app/store/reducer";
import {provideEffects} from "@ngrx/effects";
import {PhotoEffects} from "./app/store/effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({ photos: photoReducer }),
    provideEffects([PhotoEffects]),
    provideHttpClient()
  ]
});
