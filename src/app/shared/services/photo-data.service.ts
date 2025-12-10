import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../entities/interfaces/photo';
import {apiUrl} from '../entities/constants/constants';
import {UrlEnum} from '../entities/enums/url.enum';

@Injectable({
  providedIn: 'root'
})

export class PhotoDataService {
  private readonly http = inject(HttpClient);

  public getPhotosList(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${apiUrl}${UrlEnum.photos}`);
  }
}
