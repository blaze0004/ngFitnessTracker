import {Exercise} from "../../models/exercise";
import * as fromRoot from './../index';
import {
  SET_AVAILABLE_EXERCISES,
  SET_FINISHED_EXERCISES,
  SetAvailableExercises,
  SetFinishedExercises,
  START_TRAINING,
  StartTraining,
  STOP_TRAINING,
  TrainingActions
} from "./training.actions";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};
export const trainingReducer = (state = initialState, action: TrainingActions) => {
  switch (action.type) {
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action instanceof SetFinishedExercises ? action.payload : null,
      };
    case SET_AVAILABLE_EXERCISES:
      return {...state, availableExercises: action instanceof SetAvailableExercises ? action.payload : null};
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {...state.availableExercises.find(ex => action instanceof StartTraining ? ex.id === action.payload : null)}
      };
    case STOP_TRAINING:
      return {...state, activeTraining: null};
    default:
      return state;
  }
};

export const getTrainingState = createFeatureSelector<TrainingState>('training');
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
