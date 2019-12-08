import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Config } from '../app.config';

const openUrl = Config.apiURL + "/open";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  message: Object;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  /**
   * Controls route redirect
   */
  gotoSignup() {
    this.router.navigate(["signup"]);
  }

  /**
   * Page to login to the website
   * @param Username email ID of the user
   * @param Password password set by user
   */
  userLogin(Username, Password) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!Username.match(regExEmail)) {
      alert("Expected email, found " + Username);
      return;
    }

    this.http
      .post(
        openUrl + "/user/login",
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
