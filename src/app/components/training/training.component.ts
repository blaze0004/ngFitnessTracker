import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {TrainingService} from "../../services/training/training.service";
import * as fromTraining from './../../reducers/training/training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsActiveTraining);
  }


}
