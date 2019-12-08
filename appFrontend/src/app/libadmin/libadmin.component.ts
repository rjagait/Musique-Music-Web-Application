import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../app.config";
import { AdminEventsService } from "../admin-events.service";

const openUrl = Config.apiURL + "/open";

@Component({
  selector: "app-libadmin",
  templateUrl: "./libadmin.component.html",
  styleUrls: ["./libadmin.component.scss"]
})
export class LibadminComponent implements OnInit {
  allSongs: Object;
  songDetails: Object;
  songReviews: object;

  allUsers: Object;

  constructor(
    private http: HttpClient,
    private _eventService: AdminEventsService
  ) {}

  ngOnInit() {
    // Read all songs
    this._eventService.getAllSOngsForAdmin().subscribe(
      res => {
        this.allSongs = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );

    // Read all users
    this._eventService.getAllUsersForAdmin().subscribe(
      res => {
        this.allUsers = res;
        console.log(res);
      },
      err => alert(err.error.message)
    );
  }

  setUserManagerFE(username) {
    this._eventService.setUserManager(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
  }

  unsetUserManagerFE(username) {
    this._eventService.unsetUserManager(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
  }

  deactivateUserFE(username) {
    this._eventService.deactivateUser(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
  }

  activateUserFE(username) {
    this._eventService.activateUser(username).subscribe(
      res => console.log(res),
      err => alert(err.error.message)
    );
  }

  songsLib() {
    this.openTab("Songs");
  }

  playlistsLib() {
    this.openTab("Playlists");
  }

  usersLib() {
    this.openTab("Users");
  }

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
  getSongByID(SongID) {
    console.log("Getting song by ID");
    this.http
      .get(openUrl + "/song/" + SongID, {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.songDetails = res.body;
            this.songReviews = res.body["reviews"];
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
   * Returns all the reviews for a given song
   * @param SongID Song _id in songs table
   */
  getAllReviews(SongID) {
    console.log("Getting reviews by ID");
    this.http
      .get(openUrl + "/review/" + SongID, {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.songReviews = res.body;
            document.getElementById("moreButton").style.display = "none";
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

  /**
   * Controls the display of show song details
   * Hide
   */
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
}
