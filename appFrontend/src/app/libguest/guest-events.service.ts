import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";

const openUrl = Config.apiURL + "/open";

@Injectable({
  providedIn: 'root'
})
export class GuestEventsService {
  constructor(private http: HttpClient) { }

  // on init gets
  getTopnSongs() {
    return this.http.get<any>(openUrl + "/song/topn");
  }

  // Operations on songs
  searchSong(songname) {
    console.log("Searching by attribute");
    const regExName = /^[a-zA-Z0-9 àâçéèêëîïôûùüÿñæœ\',]*$/;
    if (!songname || !songname.match(regExName)) {
      alert("Format not supported");
      return;
    }

    return this.http.get<any>(openUrl + "/song/search/" + songname);
  }

  getSongByID(SongID) {
    return this.http.get(openUrl + "/song/" + SongID);
  }

  // Operations on reviews
  getAllReviews(SongID) {
    return this.http.get(openUrl + "/review/" + SongID);
  }
}
