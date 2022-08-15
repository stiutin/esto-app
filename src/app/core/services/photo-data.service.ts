import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../interfaces/photo';
import {apiUrl} from '../constants/constants';
import {UrlEnum} from '../enums/url.enum';

@Injectable({
  providedIn: 'root'
})

export class PhotoDataService {
  public arraySource = new BehaviorSubject<Photo[]>(null);
  public currentState = this.arraySource.asObservable();
  private url = `${apiUrl}${UrlEnum.photos}`;

  constructor(private http: HttpClient) { }

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.url}`);
  }

  public getPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.url}/${id}`);
  }

  public updateFavoritesList(favoritePhotos: Photo[]) {
    this.arraySource.next(favoritePhotos);
  }
}
