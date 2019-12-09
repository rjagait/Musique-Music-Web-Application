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

  // Admin action on songs
  deleteSongByID(songID) {
    console.log("Will delete song: " + songID);
    return this.http.delete<any>(openUrl + "/song/" + songID);
  }

  hideSong(songID) {
    return this.http.put<any>(openUrl + "/song/hide/" + songID, {});
  }

  unhideSong(songID) {
    return this.http.put<any>(openUrl + "/song/unhide/" + songID, {});
  }

  updateSong(songID, songDetails) {
    return this.http.put<any>(openUrl + "/song/" + songID, {
      genre: songDetails.genre,
      title: songDetails.title,
      artist: songDetails.artist,
      album: songDetails.album,
      track: songDetails.track
    });
  }

  addNewSong(newTitle, newGenre, newArtist, newAlbum, newTrack) {
    return this.http.post<any>(openUrl + "/song", {
      genre: newGenre,
      title: newTitle,
      artist: newArtist,
      album: newAlbum,
      track: newTrack
    });
  }
}
