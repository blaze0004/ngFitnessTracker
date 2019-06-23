import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AuthGuard} from "./guards/auth/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'training', loadChildren: './modules/training/training.module#TrainingModule', canLoad: [AuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
