import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit() { }

  /**
   * Navigate to login page
   */
  gotoLogin() {
    this.router.navigate(["login"]);
  }

  /**
   * Navigate to google login page
   */
  gotoGoogleLogin() {
    this._auth.googleSignin();
  }

  /**
   * Navigate to signup page
   */
  gotoSignup() {
    this.router.navigate(["signup"]);
  }

  /**
   * Navigate to guest user page
   */
  gotoGuestUser() {
    this.router.navigate(["libguest"]);
  }
}
