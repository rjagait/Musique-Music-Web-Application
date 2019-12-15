import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  message: Object;
  loginUserData = {};
  constructor(
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit() {}

  /**
   * Controls route redirect
   */
  gotoSignup() {
    this.router.navigate(["signup"]);
  }

  /**
   * Checks if user exists and check if password correct
   * returns jwt token, that is appended in future requests
   */
  userLogin() {
    this._auth.userLogin(this.loginUserData).subscribe(
      res => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        localStorage.setItem("userid", res.userid);
        console.log("isManager: " + res.isManager);
        if (res.isManager) this.router.navigate(["libadmin"]);
        else this.router.navigate(["libsecure"]);
      },
      err => {
        switch (err.error.message) {
          case "User doesn't exist": {
            alert(err.error.message + ". Please Signup first.");
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
