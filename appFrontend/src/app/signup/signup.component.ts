import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor(
    private _http: HttpService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  userSignup(Username, Password) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!Username.match(regExEmail)) {
      alert("Expected email, found " + Username);
      return;
    }

    this.http
      .post(
        "http://localhost:3000/api/open/user/signup",
        {
          username: Username,
          password: Password
        },
        { observe: "response" }
      )
      .subscribe(
        res => {
          console.log(res);
          if (res.status == 201) {
            alert("Signup Success");
          }
        },
        err => {
          console.log(err);
          switch (err.error.message) {
            case "Username Exists": {
              //rjagait: username exists, please login
              this.router.navigate(["login"]);
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
