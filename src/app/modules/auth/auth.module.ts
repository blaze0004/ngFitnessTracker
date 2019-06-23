import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from "../../components/auth/signup/signup.component";
import {LoginComponent} from "../../components/auth/login/login.component";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from '../../routes/auth-routing/auth-routing.module';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [SignupComponent,
    LoginComponent,],
  imports: [
    AngularFireAuthModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {
}
