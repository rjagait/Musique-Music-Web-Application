import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "./app.config";

const secureUrl = Config.apiURL + "/secure";

@Injectable({
  providedIn: "root"
})
export class SecureEventsService {
  constructor(private http: HttpClient) {}

  // On init get all
  getAllSongsForUser() {
    return this.http.get<any>(secureUrl + "/song");
  }

  getAllPlaylistsForUser(username) {
    console.log("URL used: " + secureUrl + "/playlist/" + username);
    return this.http.get<any>(secureUrl + "/playlist/" + username);
  }

  // Actions on Songs
  addNewSong(newTitle, newGenre, newArtist, newAlbum, newTrack) {
    return this.http.post<any>(secureUrl + "/song", {
      genre: newGenre,
      title: newTitle,
      artist: newArtist,
      album: newAlbum,
      track: newTrack
    });
  }

  // Actions on reviews
  addNewReview(newSongID, newUser, newReview, newRating) {
    console.log("Url generated: " + secureUrl + "/review");
    return this.http.post<any>(secureUrl + "/review", {
      songid: newSongID,
      userid: newUser,
      review: newReview,
      rating: newRating
    });
  }
}
