import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./app.config";

const openUrl = Config.apiURL + "/open";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
