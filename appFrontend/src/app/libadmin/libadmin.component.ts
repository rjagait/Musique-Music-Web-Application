import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from '../app.config';

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
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get top 10 songs
    console.log("Get top songs on init");
    this.http
      .get(openUrl + "/song/topn", {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.allSongs = res.body;
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

  songsLib() {
    this.openCity("Songs");
  }

  playlistsLib() {
    this.openCity("Playlists");
    // rjagait: pending all actions
  }
  
  usersLib() {
    this.openCity("Users");
    // rjagait: pending all actions
  }

  openCity(blockName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(blockName).style.display = "block";
  }

  // Get top 10 songs
  getAllSongs() {
    console.log("Get top songs on init");
    this.http
      .get(openUrl + "/song/topn", {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.allSongs = res.body;
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
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
            this.songReviews = res.body['reviews'];
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
