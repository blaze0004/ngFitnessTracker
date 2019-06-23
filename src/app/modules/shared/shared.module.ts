import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

const sharedModules = [
  CommonModule,
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
];

@NgModule({
  imports: [...sharedModules],
  exports: [...sharedModules]
})
export class SharedModule {
}
