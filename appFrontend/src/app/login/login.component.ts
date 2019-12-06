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
  // uername: string;
  // password: string;

  constructor(
    private _http: HttpService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  userLogin(Username, Password) {
    // if( Username =='admin' && Password == 'admin'){
    //   this.router.navigate(['signup']);
    // } else {
    //   alert("Invalid credentials");
    // }
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
            alert("Login Success");
          }
        },
        err => {
          console.log(err);
          switch (err.error.message) {
            case "User doesn't exist": {
              this.router.navigate(['signup']);
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
