import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {TrainingService} from "../../../services/training/training.service";
import {Exercise} from "../../../models/exercise";
import * as fromTraining from './../../../reducers/training/training.reducer';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  exercises: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  @ ViewChild(MatSort, {static: false}) sort: MatSort;
  @ ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private trainingServices: TrainingService, private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe((finishedEx: Exercise[]) => this.exercises.data = finishedEx);
    this.trainingServices.fetchCompletedAndCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.exercises.sort = this.sort;
    this.exercises.paginator = this.paginator;
  }

  onFilter(filterValue: any) {
    this.exercises.filter = filterValue.value.toString().toLowerCase();
  }

}
