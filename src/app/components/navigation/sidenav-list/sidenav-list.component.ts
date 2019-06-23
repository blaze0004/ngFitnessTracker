import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Input() sidenav: any;
  @Input() isAuth$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.sidenav.close();
    this.authService.logout();
  }
}
