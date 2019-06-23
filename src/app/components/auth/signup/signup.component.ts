import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../../services/auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {UiService} from "../../../services/ui/ui.service";
import * as fromRoot from './../../../reducers/index';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading$: Observable<boolean>;
  isLoadingSubs: Subscription;
  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // this.isLoadingSubs = this.uiService.isLoadingChanged.subscribe(isLoading => this.isLoading = isLoading)
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(signUpForm: NgForm) {
    this.authService.registerUser({
      email: signUpForm.value.email,
      password: signUpForm.value.password
    })
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubs) this.isLoadingSubs.unsubscribe();
  }
}
