import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

const db = require("../../../../config/database");
const openUrl = db.url + "/open";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"]
})
export class SongsComponent implements OnInit {
  searchedSongs: Object;
  famousSongs: Object;
  songDetails: Object;
  songReviews: object;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log("Get top songs on init");
    // rjagait: get top 10 songs
    this.http
      .get(openUrl + "/song/topn", {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.famousSongs = res.body;
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

  searchSong(Songname) {
    console.log("Searching by attribute");
    const regExName = /^[a-zA-Z0-9 àâçéèêëîïôûùüÿñæœ\',]*$/;
    if (!Songname.match(regExName)) {
      alert("Format not supported");
      return;
    }

    this.http
      .get(openUrl + "/song/search/" + Songname, {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            this.searchedSongs = res.body;
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

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
            this.songReviews = res.body.reviews;
            this.openNav();
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

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

  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("moreButton").style.display = "block";
  }
}
