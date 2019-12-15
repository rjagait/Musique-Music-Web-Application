import { Component, OnInit } from "@angular/core";
import { GuestEventsService } from './guest-events.service';

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
  constructor(private _eventService: GuestEventsService) { }

  ngOnInit() {
    this.getTopnSongsFE();
  }

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
        console.log("Check below:");
        console.log(res.reviews[0].userid.username);
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
        console.log("Check below review:");
        console.log(res[0].userid.username);
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
