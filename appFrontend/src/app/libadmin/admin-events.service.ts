import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";

const adminUrl = Config.apiURL + "/admin";

@Injectable({
  providedIn: "root"
})
export class AdminEventsService {
  constructor(private http: HttpClient) {}

  // On init get all
  getAllSOngsForAdmin() {
    return this.http.get<any>(adminUrl + "/song");
  }

  getAllUsersForAdmin() {
    return this.http.get<any>(adminUrl + "/user");
  }

  getAllPlaylistsForAdmin() {
    return this.http.get<any>(adminUrl + "/playlist");
  }

  // Admin Modifying user
  setUserManager(username) {
    return this.http.put<any>(adminUrl + "/user/setmanager/" + username, {});
  }

  unsetUserManager(username) {
    return this.http.put<any>(adminUrl + "/user/unsetmanager/" + username, {});
  }

  deactivateUser(username) {
    return this.http.put<any>(adminUrl + "/user/deactivate/" + username, {});
  }

  activateUser(username) {
    return this.http.put<any>(adminUrl + "/user/activate/" + username, {});
  }

  // Admin action on songs
  getSongByID(songID) {
    return this.http.get<any>(adminUrl + "/song/" + songID);
  }

  deleteSongByID(songID) {
    return this.http.delete<any>(adminUrl + "/song/" + songID);
  }

  hideSong(songID) {
    return this.http.put<any>(adminUrl + "/song/hide/" + songID, {});
  }

  unhideSong(songID) {
    return this.http.put<any>(adminUrl + "/song/unhide/" + songID, {});
  }

  updateSong(songID, songDetails) {
    return this.http.put<any>(adminUrl + "/song/update/" + songID, {
      genre: songDetails.genre,
      title: songDetails.title,
      artist: songDetails.artist,
      album: songDetails.album,
      track: songDetails.track
    });
  }

  addNewSong(newTitle, newGenre, newArtist, newAlbum, newTrack) {
    return this.http.post<any>(adminUrl + "/song", {
      genre: newGenre,
      title: newTitle,
      artist: newArtist,
      album: newAlbum,
      track: newTrack
    });
  }

  // Admin action on songs
  deletePlaylistByID(playlistID) {
    return this.http.delete<any>(adminUrl + "/playlist/" + playlistID);
  }

  getPlaylistByID(playlistID) {
    return this.http.get<any>(adminUrl + "/playlist/" + playlistID);
  }

  updatePlaylistDetails(playlistID, playlistDetails) {
    return this.http.put<any>(
      adminUrl + "/playlist/updatedetails/" + playlistID,
      {
        title: playlistDetails.title,
        description: playlistDetails.description
      }
    );
  }

  addNewPlaylist(newTitle, newDesc, newUsername) {
    console.log("Will add these details: " + newTitle + newDesc + newUsername);
    return this.http.post<any>(adminUrl + "/playlist", {
      username: newUsername,
      title: newTitle,
      description: newDesc
    });
  }
}
