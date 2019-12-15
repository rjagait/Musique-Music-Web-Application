import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";
import { AdminEventsService } from "./admin-events.service";
import { AuthService } from "../auth.service";

const openUrl = Config.apiURL + "/open";

@Component({
  selector: "app-libadmin",
  templateUrl: "./libadmin.component.html",
  styleUrls: ["./libadmin.component.scss"]
})
export class LibadminComponent implements OnInit {
  allSongs: Object;
  songDetails: Object;

  allUsers: Object;
  self: String;

  allPlaylists: Object;
  playListDetails: Object;

  // Attributes of new song
  newGenre: String;
  newTitle: String;
  newArtist: String;
  newAlbum: String;
  newTrack: String;

  // Attributes of new Playlist
  newTitle1: String;
  newDescription: String;
  newUsername: String;

  constructor(
    private http: HttpClient,
    private _eventService: AdminEventsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.self = this._authService.getUsername();
    this.updateAllSongs();
    this.updateAllPlaylists();
    this.updateAllUsers();
  }

  /**
   * Load all songs from db and display
   */
  updateAllSongs() {
    this._eventService.getAllSOngsForAdmin().subscribe(
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
    this._eventService.getAllPlaylistsForAdmin().subscribe(
      res => {
        this.allPlaylists = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Load all users from db and display
   */
  updateAllUsers() {
    this._eventService.getAllUsersForAdmin().subscribe(
      res => {
        this.allUsers = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Change status of user to isManager=true
   * @param username email of the user
   */
  setUserManagerFE(username) {
    this._eventService.setUserManager(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllUsers();
    }, 500);
  }

  /**
   * Change status of user to isManager=false
   * @param username email of the user
   */
  unsetUserManagerFE(username) {
    this._eventService.unsetUserManager(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllUsers();
    }, 500);
  }

  /**
   * Change status of user to isDeactivate=true
   * @param username email of the user
   */
  deactivateUserFE(username) {
    this._eventService.deactivateUser(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllUsers();
    }, 500);
  }

  /**
   * Change status of user to isDeactivate=false
   * @param username email of the user
   */
  activateUserFE(username) {
    this._eventService.activateUser(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllUsers();
    }, 500);
  }

  /**
   * Delete the song from db
   * @param songID _id of the song
   */
  deleteSongByIdFE(songID) {
    this._eventService.deleteSongByID(songID).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Hide and not delete the song from user list
   * @param songID _id of the song
   */
  hideSongFE(songID) {
    this._eventService.hideSong(songID).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Unhide a hidden song
   * @param songID _id of the song
   */
  unhideSongFE(songID) {
    this._eventService.unhideSong(songID).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Edit and update the details of a song
   * @param songID _id of the song
   */
  updateSongDetailsFE(songID) {
    this._eventService.updateSong(songID, this.songDetails).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    this.closeNav("myNav");
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Open div to enter details to add new song
   */
  NavigateAddNewSong() {
    this.openNav("myNewNav");
  }

  /**
   * Add a new song in db
   */
  addNewSongFE() {
    this._eventService
      .addNewSong(
        this.newTitle,
        this.newGenre,
        this.newArtist,
        this.newAlbum,
        this.newTrack
      )
      .subscribe(
        res => console.log(res),
        err => alert(err.error.message)
      );
    this.closeNav("myNewNav");
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
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
   * Search song by ID
   * @param SongID Song _id in songs table
   */
  getAndModifySongByID(SongID) {
    this.http
      .get(openUrl + "/song/" + SongID, {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.songDetails = res.body;
            this.openNav("myNav");
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

  /**
   * Controls the display of show song details
   * Show
   */
  openNav(id: string) {
    document.getElementById(id).style.width = "100%";
  }

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNav(id: string) {
    document.getElementById(id).style.width = "0%";
  }

  /**
   * Delete the playlist from db
   * @param playlistID _id of the playlist
   */
  deletePlaylistByIdFE(playlistID) {
    this._eventService.deletePlaylistByID(playlistID).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    setTimeout(() => {
      this.updateAllPlaylists();
    }, 500);
  }

  /**
   * Get playlist details from db and display
   */
  getPlaylistByIDFE(playlistID) {
    console.log("getting playlist: " + playlistID);
    this._eventService.getPlaylistByID(playlistID).subscribe(
      res => {
        this.playListDetails = res;
        console.log("Details read: " + res.title);
      },
      err => alert(err.error.message)
    );
    this.openNav("myPlaylistNav");
  }

  /**
   * Edit and update the details of a playlist
   * @param playlistID _id of the playlist
   */
  updatePlaylistDetailsFE(playlistID) {
    this._eventService
      .updatePlaylistDetails(playlistID, this.playListDetails)
      .subscribe(
        res => console.log(res),
        err => alert(err.error.message)
      );
    this.closeNav("myPlaylistNav");
    setTimeout(() => {
      this.updateAllPlaylists();
    }, 500);
  }

  /**
   * Add a new song in db
   */
  addNewPlaylistFE() {
    this._eventService
      .addNewPlaylist(this.newTitle1, this.newDescription, this.newUsername)
      .subscribe(
        res => console.log(res),
        err => alert(err.error.message)
      );
    this.closeNav("myNewPlaylistNav");
    setTimeout(() => {
      this.updateAllPlaylists();
    }, 500);
  }
}
