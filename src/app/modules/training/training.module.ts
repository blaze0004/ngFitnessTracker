import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingComponent} from "../../components/training/training.component";
import {
  CurrentTrainingComponent,
  StopTrainingComponent
} from "../../components/training/current-training/current-training.component";
import {PastTrainingsComponent} from "../../components/training/past-trainings/past-trainings.component";
import {NewTrainingComponent} from "../../components/training/new-training/new-training.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";
import {TrainingRoutingModule} from '../../routes/training-routing/training-routing.module';
import {SharedModule} from "../shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {trainingReducer} from "../../reducers/training/training.reducer";

@NgModule({
  declarations: [TrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    StopTrainingComponent],
  imports: [
    TrainingRoutingModule,
    SharedModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}
