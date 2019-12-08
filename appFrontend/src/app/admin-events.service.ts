import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./app.config";

const openUrl = Config.apiURL + "/admin";

@Injectable({
  providedIn: "root"
})
export class AdminEventsService {
  constructor(private http: HttpClient) {}

  getAllSOngsForAdmin() {
    return this.http.get<any>(openUrl + "/song");
  }
}
