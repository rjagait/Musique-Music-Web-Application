import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./app.config";

const openUrl = Config.apiURL + "/admin";

@Injectable({
  providedIn: "root"
})
export class AdminEventsService {
  constructor(private http: HttpClient) {}

  // On init get all
  getAllSOngsForAdmin() {
    return this.http.get<any>(openUrl + "/song");
  }

  getAllUsersForAdmin() {
    return this.http.get<any>(openUrl + "/user");
  }

  // Admin Modifying user
  setUserManager(username) {
    return this.http.put<any>(openUrl + "/user/setmanager/" + username, {});
  }

  unsetUserManager(username) {
    return this.http.put<any>(openUrl + "/user/unsetmanager/" + username, {});
  }

  deactivateUser(username) {
    return this.http.put<any>(openUrl + "/user/deactivate/" + username, {});
  }

  activateUser(username) {
    return this.http.put<any>(openUrl + "/user/activate/" + username, {});
  }
}
