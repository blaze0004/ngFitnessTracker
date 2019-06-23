import {START_LOADING, STOP_LOADING, UiActions} from "./ui.actions";

export interface State {
  isLoading: boolean,
}

const initialState: State = {
  isLoading: false
}

export const UIReducer = (state = initialState, action: UiActions) => {

  switch (action.type) {
    case START_LOADING: return {
      isLoading: true
    };
    case STOP_LOADING: return {
      isLoading: false
    };
    default: return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
