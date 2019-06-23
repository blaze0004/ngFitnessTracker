import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material";
import {TrainingService} from "../../../services/training/training.service";
import {Store} from "@ngrx/store";
import * as fromTraining from './../../../reducers/training/training.reducer';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.startAndResumeTimer();
  }

  startAndResumeTimer = () => {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(activeEx => {
      const steps = activeEx.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, steps);
    })
  };

  onStop() {
    clearInterval(this.timer);
    const dialogData = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogData.afterClosed().subscribe((data) => {
      if (data) {
        this.trainingService.cancelledExercise(this.progress);
      } else {
        this.startAndResumeTimer();
      }
    })
  }
}

@Component({
  selector: 'stop-training',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
  <mat-dialog-content>
    You already got {{ progressData.progress }}% done!
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
  </mat-dialog-actions>`
})
export class StopTrainingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public progressData: MatDialogConfig) {
  }
}
