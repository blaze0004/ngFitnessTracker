import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isLoadingChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private matSnackBar: MatSnackBar) { }

  showSnackBar(message, action, config) {
    this.matSnackBar.open(message, action, config);
  }

}
