import {Injectable} from '@angular/core';
import {Authdata} from "../../models/authdata";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {TrainingService} from "../training/training.service";
import {UiService} from "../ui/ui.service";
import {Store} from "@ngrx/store";
import * as fromRoot from './../../reducers/index';
import * as UI from './../../reducers/ui/ui.actions';
import * as Auth from './../../reducers/auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange: Subject<boolean> = new Subject<boolean>();
  authUID: string = null;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiService: UiService, private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthenticated());
        this.trainingService.authUID = user.uid;
        this.router.navigate(['/training']).catch(e => this.uiService.showSnackBar(e.message, null, {duration: 3000}));
      } else {
        this.trainingService.cancelSubscriptions();
        this.trainingService.authUID = null;
        this.router.navigate(['/login']).catch(e => this.uiService.showSnackBar(e.message, null, {duration: 3000}));
        // this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
      }
    })
  }

  registerUser(authData: Authdata) {
    this.store.dispatch(new UI.StartLoading());
    //this.uiService.isLoadingChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() =>
        this.store.dispatch(new UI.StopLoading()))
      .catch(e => {
        // this.uiService.isLoadingChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(e.message, null, {duration: 3000})
      });
  }

  login(authData: Authdata) {
    // this.uiService.isLoadingChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() =>
        this.store.dispatch(new UI.StopLoading()))
      .catch(e => {
        // this.uiService.isLoadingChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(e.message, null, {duration: 3000})
      });
  }

  logout() {
    // this.uiService.isLoadingChanged.next(true);
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.afAuth.auth.signOut()
      .then(() =>
        // this.uiService.isLoadingChanged.next(false)
        this.store.dispatch(new UI.StopLoading()))
      .catch(e => {
        // this.uiService.isLoadingChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(e.message, null, {duration: 3000})
      });
  }


  isAuth(): Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth);
  }

}
