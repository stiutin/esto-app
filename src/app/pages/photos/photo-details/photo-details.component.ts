import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoSelectors from '../../../store/selectors';
import * as PhotoActions from '../../../store/actions';
import {IProduct} from "../../../shared/entities/interfaces/product.interface";

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
  imports: [RouterLink, AsyncPipe],
  standalone: true,
})
export class PhotoDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  protected photo$: Observable<IProduct>;
  private photoId: number;

  constructor() {
    this.titleService.setTitle('Esto App | Cart');
  }

  public ngOnInit(): void {
    this.photoId = +this.route.snapshot.paramMap.get('id');
    this.photo$ = this.store.select(PhotoSelectors.selectPhotoById(this.photoId));
  }

  protected removePhoto(photoId: number): void {
    this.store.dispatch(PhotoActions.removeFromCart({ photoId }));
  }
}
