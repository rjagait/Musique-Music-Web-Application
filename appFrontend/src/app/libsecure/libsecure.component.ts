import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { SecureEventsService } from "../secure-events.service";

@Component({
  selector: "app-libsecure",
  templateUrl: "./libsecure.component.html",
  styleUrls: ["./libsecure.component.scss"]
})
export class LibsecureComponent implements OnInit {
  allSongs: Object;
  allPlaylists: Object;
  allUserPlaylists: Object;

  self: String;
  selfID: String;

  // Attributes of new song
  newTitle: String;
  newArtist: String;
  newAlbum: String;
  newTrack: String;
  newGenre: String;
  newReview: String;
  newRating: Number;

  // Attributes of new playlist
  newPlaylistTitle: String;
  newPlaylistDesc: String;
  newPlaylistIsPublic: String;

  songId: String;

  constructor(
    private _seventService: SecureEventsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.self = this._authService.getUsername();
    this.selfID = this._authService.getUserid();
    this.updateAllSongs();
    this.updateAllPlaylists();
  }

  /**
   * Load all songs from db and display
   */
  updateAllSongs() {
    this._seventService.getAllSongsForUser().subscribe(
      res => {
        this.allSongs = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Load all playlists from db and display
   */
  updateAllPlaylists() {
    this._seventService.getAllPlaylistsForUser(this.self).subscribe(
      res => {
        this.allPlaylists = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * controls the tab contents that would be displayed
   * @param blockName name of the block to open
   */
  openTab(blockName) {
    var i, lefttabcontent;
    lefttabcontent = document.getElementsByClassName("lefttabcontent");
    for (i = 0; i < lefttabcontent.length; i++) {
      lefttabcontent[i].style.display = "none";
    }
    document.getElementById(blockName).style.display = "block";
  }

  /**
   * Controls the display of show song details
   * Show
   */
  openNewNav() {
    document.getElementById("myNewNav").style.width = "100%";
  }
  openReviewNav() {
    document.getElementById("myReviewNav").style.width = "100%";
  }
  openPlaylistNav() {
    document.getElementById("myPlaylistNav").style.width = "100%";
  }
  openSong2PlaylistNav() {
    document.getElementById("mySong2PlaylistNav").style.width = "100%";
  }

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNewNav() {
    document.getElementById("myNewNav").style.width = "0%";
  }
  closeReviewNav() {
    document.getElementById("myReviewNav").style.width = "0%";
  }
  closePlaylistNav() {
    document.getElementById("myPlaylistNav").style.width = "0%";
  }
  closeSong2PlaylistNav() {
    document.getElementById("mySong2PlaylistNav").style.width = "0%";
  }

  /**
   * Add a new song in db
   */
  addNewSongFE() {
    this._seventService
      .addNewSong(
        this.newTitle,
        this.newGenre,
        this.newArtist,
        this.newAlbum,
        this.newTrack
      )
      .subscribe(
        res => {
          console.log(res);

          // Add optional review
          if (this.newRating) {
            this._seventService
              .addNewReview(
                res.createdDetail._id,
                this.selfID,
                this.newReview,
                this.newRating
              )
              .subscribe(
                res => {
                  console.log(res);
                },
                err => alert(err.error.message)
              );
          }
        },
        err => alert(err.error.message)
      );

    this.closeNewNav();
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Search song by a string for any attribute
   */
  searchSong(Songname) {
    console.log("Searching by attribute");
    const regExName = /^[a-zA-Z0-9 àâçéèêëîïôûùüÿñæœ\',]*$/;
    if (!Songname) {
      this.updateAllSongs();
      return;
    } else if (!Songname.match(regExName)) {
      alert("Format not supported");
      return;
    }

    this._seventService.searchSongByAttribute(Songname).subscribe(
      res => {
        if (!res) {
          alert("Found Nothing");
          return;
        }
        this.allSongs = res;
        console.log("received:" + res.length);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Open dialog box to get review, and store songId
   * @param songId ID of the song
   */
  getReviewofSong(songID) {
    this.songId = songID;
    this.openReviewNav();
  }

  /**
   * Add review to old song by ID
   */
  reviewThisSong() {
    this._seventService
      .addNewReview(this.songId, this.selfID, this.newReview, this.newRating)
      .subscribe(
        res => {
          console.log(res);
        },
        err => alert(err.error.message)
      );
    this.closeReviewNav();
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Search playlist of either self or public playlists
   */
  searchPlaylistFE(playlistname) {
    console.log("Searching by attribute");
    const regExName = /^[a-zA-Z0-9 àâçéèêëîïôûùüÿñæœ\',]*$/;
    if (!playlistname) {
      console.log("Empty input, will reload");
      this.updateAllPlaylists();
      return;
    } else if (!playlistname.match(regExName)) {
      alert("Format not supported");
      return;
    }

    this._seventService.searchPlaylist(this.self, playlistname).subscribe(
      res => {
        if (!res) {
          alert("Found Nothing");
          return;
        }
        this.allPlaylists = res;
        console.log("received:" + res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Add a new playlist in db
   */
  addNewPlaylistFE() {
    this._seventService
      .addNewPlaylist(
        this.self,
        this.newPlaylistTitle,
        this.newPlaylistDesc,
        this.newPlaylistIsPublic
      )
      .subscribe(
        res => {
          console.log(res);
        },
        err => alert(err.error.message)
      );
    this.closePlaylistNav();
    setTimeout(() => {
      this.updateAllPlaylists();
    }, 500);
  }

  /**
   * Open dialog box to select playlist, and add songId
   * @param songId ID of the song
   */
  getPlaylistsandDisplay(songID) {
    this.songId = songID;
    this.updateAllPlaylistsOnly();
    this.openSong2PlaylistNav();
  }

  /**
   * Load all user only playlists from db and display
   */
  updateAllPlaylistsOnly() {
    this._seventService.getAllPlaylistsForOnlyUser(this.self).subscribe(
      res => {
        this.allUserPlaylists = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Add a new song to a user playlist in db
   */
  addSongToPlaylistFE(playlistID) {
    this._seventService.addSongToPlaylist(playlistID, this.songId).subscribe(
      res => {
        console.log(res);
      },
      err => alert(err.error.message)
    );
    this.closeSong2PlaylistNav();
    setTimeout(() => {
      this.updateAllPlaylists();
    }, 500);
  }
}
