import {Component, OnInit} from '@angular/core';
import {TrainingService} from "../../../services/training/training.service";
import {Exercise} from "../../../models/exercise";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {UiService} from "../../../services/ui/ui.service";
import * as fromRoot from './../../../reducers/index';
import * as fromTraining from './../../../reducers/training/training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  availableExercises: Exercise[];
  isLoading$: Observable<boolean>;
  isAvailableExercisesFetched: boolean = null;

  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.fetchAvailableExercises();
  }

  onStartTraining(trainingForm: NgForm) {
    const selectedId = trainingForm.value.training;
    if (selectedId)
      this.trainingService.startExercise(selectedId);
    else
      this.uiService.showSnackBar('Please choose an exercise first...', null, {duration: 3000});
  }


  fetchAvailableExercises() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.store.select(fromTraining.getAvailableExercises).subscribe(availableEx => {
      this.availableExercises = availableEx;
      this.isAvailableExercisesFetched = true;
    }, () => this.isAvailableExercisesFetched = false);

    this.trainingService.fetchAvailableExercises();
  }
}
