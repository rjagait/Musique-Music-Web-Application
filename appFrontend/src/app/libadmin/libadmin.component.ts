import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";
import { AdminEventsService } from "../admin-events.service";
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

  // Attributes of new song
  newGenre: String;
  newTitle: String;
  newArtist: String;
  newAlbum: String;
  newTrack: String;

  constructor(
    private http: HttpClient,
    private _eventService: AdminEventsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.self = this._authService.getUsername();
    this.updateAllSongs();
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
    console.log("Updated users");
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
    this.closeNav();
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
  }

  /**
   * Open div to enter details to add new song
   */
  NavigateAddNewSong(){
    this.openNewNav();
  }

  /**
   * Add a new song in db
   */
  addNewSongFE() {
    this._eventService.addNewSong(this.newTitle, this.newGenre, this.newArtist, this.newAlbum, this.newTrack).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
    this.closeNav();
    setTimeout(() => {
      this.updateAllSongs();
    }, 500);
    this.closeNewNav();
  }

  /**
   * controls the tab contents that would be displayed
   * @param blockName name of the block to open
   */
  openTab(blockName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
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
            this.openNav();
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
  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  openNewNav() {
    document.getElementById("myNewNav").style.width = "100%";
  }

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  closeNewNav() {
    document.getElementById("myNewNav").style.width = "0%";
  }
}
