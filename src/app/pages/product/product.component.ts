import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as PhotoSelectors from '../../store/selectors';
import * as PhotoActions from '../../store/actions';
import {IProduct} from "../../shared/entities/interfaces/product.interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [RouterLink, AsyncPipe],
  standalone: true,
})
export class ProductComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  protected product$: Observable<IProduct>;
  private productId: number;

  constructor() {
    this.titleService.setTitle('Esto App | Cart');
  }

  public ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.product$ = this.store.select(PhotoSelectors.selectPhotoById(this.productId));
  }

  protected removeProduct(productId: number): void {
    this.store.dispatch(PhotoActions.removeFromCart({ productId }));
  }
}
