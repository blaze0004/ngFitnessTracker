import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromUI from './ui/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

import { environment } from '../../environments/environment';

export interface State {
  ui: fromUI.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.UIReducer,
  auth: fromAuth.AuthReducer
};

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
