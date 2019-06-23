import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import * as fromRoot from './reducers/index';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitness-tracker';
  isAuth$: Observable<boolean>;

  authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {

    this.authService.initAuthListener();
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }


}
