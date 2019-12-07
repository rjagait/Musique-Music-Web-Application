import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { finalize, tap } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  message: Object;

  constructor(
    private _http: HttpService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  gotoSignup() {
    this.router.navigate(["signup"]);
  }

  userLogin(Username, Password) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!Username.match(regExEmail)) {
      alert("Expected email, found " + Username);
      return;
    }

    this.http
      .post(
        "http://localhost:3000/api/open/user/login",
        {
          username: Username,
          password: Password
        },
        { observe: "response" }
      )
      .subscribe(
        res => {
          console.log(res);
          if (res.status == 200) {
            console.log(res);
            alert("Login Success");
          }
        },
        err => {
          console.log(err);
          switch (err.error.message) {
            case "User doesn't exist": {
              //rjagait: username does't exist, please signup
              this.gotoSignup();
              break;
            }
            default: {
              alert(err.error.message);
              break;
            }
          }
        }
      );
  }
}
