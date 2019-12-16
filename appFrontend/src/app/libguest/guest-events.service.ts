import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";
import { SanitizeService } from '../sanitize.service';

const openUrl = Config.apiURL + "/open";

@Injectable({
  providedIn: 'root'
})
export class GuestEventsService {
  constructor(private http: HttpClient, private _sanitize: SanitizeService) { }

  // on init gets
  getTopnSongs() {
    return this.http.get<any>(openUrl + "/song/topn");
  }

  // Operations on songs
  searchSong(songname) {
    if (!this._sanitize.isString(songname)) {
      return;
    }
    return this.http.get<any>(openUrl + "/song/search/" + songname);
  }

  getSongByID(SongID) {
    return this.http.get(openUrl + "/song/byid/" + SongID);
  }

  // Operations on reviews
  getAllReviews(SongID) {
    return this.http.get(openUrl + "/review/" + SongID);
  }
}
