import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import { Config } from "./app.config";
import { SanitizeService } from './sanitize.service';

const openUrl = Config.apiURL + "/open";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router,
    private _sanitize: SanitizeService
  ) { }

  private isEmpty(str: string) {
    if (!str) {
      return true;
    }
    return false;
  }

  userLogin(user) {
    if (this.isEmpty(user.username)) {
      alert("Username not entered");
      return;
    }
    if (this.isEmpty(user.password)) {
      alert("Password not entered");
      return;
    }
    if (!this._sanitize.isEmail(user.username)) {
      return;
    }
    return this.http.post<any>(openUrl + "/user/login", {
      username: user.username,
      password: user.password
    });
  }

  resendEmail(Username) {
    return this.http.get<any>(openUrl + "/user/resendverify/" + Username);
  }

  userSignup(Username, Password) {
    if (!this._sanitize.isEmail(Username)) {
      return;
    }
    console.log("will send signup request");
    return this.http.post<any>(openUrl + "/user/signup", {
      username: Username,
      password: Password
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getUserid() {
    return localStorage.getItem("userid");
  }

  getIsManager() {
    return localStorage.getItem("ismanager");
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    var username = credential.user.email;
    return this.http
      .post<any>(openUrl + "/user/googlelogin/" + username, {})
      .subscribe(
        res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          localStorage.setItem("userid", res.userid);
          localStorage.setItem("ismanager", res.isManager);
          console.log("isManager: " + res.isManager);
          this.router.navigate(["libguest"]);
        },
        err => {
          alert(err.error.message);
        }
      );
  }
}
