import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./app.config";

const openUrl = Config.apiURL + "/secure";

@Injectable({
  providedIn: "root"
})
export class SecureEventsService {
  constructor(private http: HttpClient) {}

  // On init get all
  getAllSongsForUser() {
    return this.http.get<any>(openUrl + "/song");
  }

  getAllPlaylistsForUser(username) {
    console.log("URL used: " + openUrl + "/playlist/" + username);
    return this.http.get<any>(openUrl + "/playlist/" + username);
  }
}
