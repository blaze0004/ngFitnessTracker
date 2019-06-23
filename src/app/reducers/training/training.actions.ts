import {Action} from "@ngrx/store";
import {Exercise} from "../../models/exercise";

export const SET_AVAILABLE_EXERCISES = '[Training] Set Available Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const STOP_TRAINING = '[Training] Stop Training';
export const START_TRAINING = '[Training] Start Training';

export class SetAvailableExercises implements Action {
  readonly type: string = SET_AVAILABLE_EXERCISES;

  constructor(public payload: Exercise[]) {
  }
}

export class SetFinishedExercises implements Action {
  readonly type: string = SET_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type: string = START_TRAINING;

  constructor(public payload: string) {
  }
}

export class StopTraining implements Action {
  readonly type: string = STOP_TRAINING;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartTraining | StopTraining;
