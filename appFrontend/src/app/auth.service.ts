import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import { Config } from "./app.config";

const openUrl = Config.apiURL + "/open";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  userLogin(user) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!user.username.match(regExEmail)) {
      alert("Expected email, found " + user.username);
      return;
    }

    return this.http.post<any>(openUrl + "/user/login", {
      username: user.username,
      password: user.password
    });
  }

  userSignup(Username, Password) {
    const regExEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!Username.match(regExEmail)) {
      alert("Expected email, found " + Username);
      return;
    }
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
          console.log("isManager: " + res.isManager);
          if (res.isManager) this.router.navigate(["libadmin"]);
          else this.router.navigate(["libsecure"]);
        },
        err => {
          alert(err.error.message);
        }
      );
  }
}
