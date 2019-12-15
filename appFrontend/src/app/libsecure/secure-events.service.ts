import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Config } from "../app.config";
import { SanitizeService } from '../sanitize.service';

const secureUrl = Config.apiURL + "/secure";

@Injectable({
  providedIn: "root"
})
export class SecureEventsService {
  constructor(private http: HttpClient, private _sanitize: SanitizeService) { }

  // On init get all
  getAllSongsForUser() {
    return this.http.get<any>(secureUrl + "/song");
  }

  getAllPlaylistsForUser(username) {
    return this.http.get<any>(secureUrl + "/playlist/byusername/" + username);
  }

  // Actions on Songs
  addNewSong(newTitle, newGenre, newArtist, newAlbum, newTrack) {
    if (!this._sanitize.isString(newTitle) ||
      !this._sanitize.isString(newGenre) ||
      !this._sanitize.isString(newArtist) ||
      !this._sanitize.isString(newAlbum) ||
      !this._sanitize.isString(newTrack)
    ) {
      return;
    }
    return this.http.post<any>(secureUrl + "/song", {
      genre: newGenre,
      title: newTitle,
      artist: newArtist,
      album: newAlbum,
      track: newTrack
    });
  }

  searchSongByAttribute(str) {
    if (!this._sanitize.isString(str)) {
      return;
    }
    return this.http.get<any>(secureUrl + "/song/search/" + str);
  }

  // Actions on reviews
  addNewReview(newSongID, newUser, newReview, newRating) {
    if (!this._sanitize.isString(newReview)
    ) {
      return;
    }
    return this.http.post<any>(secureUrl + "/review", {
      songid: newSongID,
      userid: newUser,
      review: newReview,
      rating: newRating
    });
  }

  // Actions on playlists
  addNewPlaylist(user, newTitle, newDesc, ispublic) {
    if (!this._sanitize.isString(newDesc)
    ) {
      return;
    }
    return this.http.post<any>(secureUrl + "/playlist", {
      username: user,
      title: newTitle,
      description: newDesc,
      isPublic: ispublic ? true : false
    });
  }

  addSongToPlaylist(playlistID, songID) {
    return this.http.put<any>(secureUrl + "/playlist/addsong", {
      id: playlistID,
      songid: songID
    });
  }

  searchPlaylist(user, str) {
    if (!this._sanitize.isString(str)
    ) {
      return;
    }
    return this.http.get<any>(
      secureUrl + "/playlist/search/" + user + "/" + str
    );
  }

  getAllPlaylistsForOnlyUser(username) {
    return this.http.get<any>(
      secureUrl + "/playlist/byonlyusername/" + username
    );
  }

  getPlaylistByID(playlistID) {
    return this.http.get<any>(secureUrl + "/playlist/byid/" + playlistID);
  }

  updatePlaylistDetails(playlistID, playlistDetails) {
    return this.http.put<any>(
      secureUrl + "/playlist/updatedetails/" + playlistID,
      {
        title: playlistDetails.title,
        description: playlistDetails.description
      }
    );
  }

  removeSongFromPlaylist(playlistID, songID) {
    return this.http.put<any>(secureUrl + "/playlist/removesong", {
      id: playlistID,
      songid: songID
    });
  }
}
