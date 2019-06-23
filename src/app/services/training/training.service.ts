import {Injectable} from '@angular/core';
import {Exercise} from "../../models/exercise";
import {Subscription} from "rxjs";
import {map, take} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {UiService} from "../ui/ui.service";
import * as fromTraining from './../../reducers/training/training.reducer';
import * as UI from '../../reducers/ui/ui.actions';
import * as Training from './../../reducers/training/training.actions';
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  afSub: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>) {
  }

  private _authUID: string = null;

  set authUID(value: string) {
    this._authUID = value;
  }

  fetchAvailableExercises() {
    // this.uiService.isLoadingChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afSub.push(this.db.collection<Exercise>('availableExercises').snapshotChanges().pipe(map(data => {
      return data.map(data => ({
        id: data.payload.doc.id,
        name: data.payload.doc.data().name,
        duration: data.payload.doc.data().duration,
        calories: data.payload.doc.data().calories
      }))
    })).subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetAvailableExercises(exercises));
      // this.uiService.isLoadingChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
    }, e => {
      // this.uiService.isLoadingChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(e.message, null, {duration: 3000})
    }))
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeEx => {
      this.storeDataToDatabase({...activeEx, date: Date.now(), state: 'completed'});
      this.store.dispatch(new Training.StopTraining())
    })

  }

  cancelledExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeEx => {
      this.storeDataToDatabase({
        ...activeEx,
        date: Date.now(),
        state: 'cancelled',
        duration: activeEx.duration * (progress / 100),
        calories: activeEx.calories * (progress / 100)
      });
      this.store.dispatch(new Training.StopTraining());
    })

  }

  fetchCompletedAndCancelledExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.afSub.push(this.db.collection(`users/${this._authUID}/finishedExercises`).valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedExercises(exercises));
      this.store.dispatch(new UI.StopLoading());
    }, e => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(e.message, null, {duration: 3000})
    }))
  }

  cancelSubscriptions() {
    this.afSub.forEach(sub => sub.unsubscribe());
  }

  private storeDataToDatabase(exercise: Exercise) {
    this.db.collection(`users/${this._authUID}/finishedExercises`).add(exercise)
      .then(() => this.uiService.showSnackBar('Exercise Result Saved..', null, {duration: 3000}))
      .catch(e => {
        this.uiService.showSnackBar(e.message, null, {duration: 3000})
      });
  }
}
