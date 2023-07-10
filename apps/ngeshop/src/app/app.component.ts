import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'ngeshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngeshop';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
