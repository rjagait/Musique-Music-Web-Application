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

  gotoLogin() {
    this.router.navigate(["login"]);
  }

  gotoGoogleLogin() {
    this._auth.googleSignin();
  }

  gotoSignup() {
    this.router.navigate(["signup"]);
  }

  gotoGuestUser() {
    this.router.navigate(["libguest"]);
  }
}
