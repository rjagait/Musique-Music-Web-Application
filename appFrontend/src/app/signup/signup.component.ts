import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit() { }

  /**
   * Controls user signup
   * @param Username Email ID of user
   * @param Password Password to be set
   */
  userSignup(Username, Password) {
    this._auth.userSignup(Username, Password).subscribe(
      res => {
        alert("Signup Success, please verify email before logging in. Redirecting to login page.");
        this.router.navigate(["login"]);
      },
      err => {
        console.log(err);
        switch (err.error.message) {
          case "Username Exists": {
            alert("Username exists, please login");
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
