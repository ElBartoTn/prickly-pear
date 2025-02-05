import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";
import { User } from "@app/_models/user";
import { AuthenticationService } from "@app/_services/authentication.service";
import { UserService } from "@app/_services/user.service";
@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
  loading = false;
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
