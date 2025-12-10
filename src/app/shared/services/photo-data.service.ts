import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../entities/interfaces/photo';
import {apiUrl} from '../entities/constants/constants';
import {UrlEnum} from '../entities/enums/url.enum';

@Injectable({
  providedIn: 'root'
})

export class PhotoDataService {
  private http = inject(HttpClient);

  public arraySource = new BehaviorSubject<Photo[]>(null);
  public currentState = this.arraySource.asObservable();
  private url = `${apiUrl}${UrlEnum.photos}`;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() { }

  public getPhotosList(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}`);
  }

  public getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.url}/${id}`);
  }

  public updateFavoritesList(favoritePhotos: Photo[]) {
    this.arraySource.next(favoritePhotos);
  }
}
