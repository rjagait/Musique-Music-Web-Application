import { Component, OnInit } from "@angular/core";
import { GuestEventsService } from './guest-events.service';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: "app-songs",
  templateUrl: "./libguest.component.html",
  styleUrls: ["./libguest.component.scss"]
})
export class LibguestComponent implements OnInit {

  searchedSongs: Object;
  famousSongs: Object;
  songDetails: Object;
  songReviews: object;

  isAuthenticatedUser: Boolean;
  isAdmin: Boolean;


  constructor(
    private router: Router,
    private _eventService: GuestEventsService,
    private _authService: AuthService) {
      var user = this._authService.getUsername();
      console.log("user: "+ user);
      if(user === "NA"){
        this.isAuthenticatedUser= false;
      } else {
        this.isAuthenticatedUser= true;
      }
      var isadmin = this._authService.getIsManager();
      console.log("isadmin: "+ isadmin);
      if(isadmin === "false"){
        this.isAdmin= false;
      } else {
        this.isAdmin= true;
      }
  }

  ngOnInit() {
    this.getTopnSongsFE();
  }

  accessUserFunc() {
    this.router.navigate(["libsecure"]);
  }

  accessAdminFunc() {
    this.router.navigate(["libadmin"]);
  }

  /**
   * Get top n songs with highest average rating
   */
  getTopnSongsFE() {
    this._eventService.getTopnSongs().subscribe(
      res => {
        console.log(res);
        this.famousSongs = res;
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Search song by a string for any attribute
   * @param Songname name of song
   */
  searchSong(Songname) {
    this._eventService.searchSong(Songname).subscribe(
      res => {
        console.log(res);
        this.searchedSongs = res;
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Search song by ID
   * @param SongID Song _id in songs table
   */
  getSongByID(SongID) {
    this._eventService.getSongByID(SongID).subscribe(
      res => {
        console.log(res);
        this.songDetails = res;
        this.songReviews = res['reviews'];
        this.openNav();
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Returns all the reviews for a given song
   * @param SongID Song _id in songs table
   */
  getAllReviews(SongID) {
    this._eventService.getAllReviews(SongID).subscribe(
      res => {
        console.log(res);
        this.songReviews = res;
        document.getElementById("moreButton").style.display = "none";
      },
      err => alert(err.error.message)
    );
  }

  /**
   * Controls the display of show song details
   * Show
   */
  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
}
