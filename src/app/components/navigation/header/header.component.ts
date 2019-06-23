import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: any;
  @Input() isAuth$: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {

  }


  onLogout() {
    this.authService.logout();
  }
}
