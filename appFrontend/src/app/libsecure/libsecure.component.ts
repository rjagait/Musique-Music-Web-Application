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

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNewNav() {
    document.getElementById("myNewNav").style.width = "0%";
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
          if(this.newRating){
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
}
