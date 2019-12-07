import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"]
})
export class SongsComponent implements OnInit {
  searchedSongs: Object;
  famousSongs: Object;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log("Get top songs on init");
    // rjagait: get top 10 songs
    this.http
      .get("http://localhost:3000/api/open/song/", {
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
      .get("http://localhost:3000/api/open/song/search/" + Songname, {
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
      .get("http://localhost:3000/api/open/song/" + SongID, {
        observe: "response"
      })
      .subscribe(
        res => {
          if (res.status == 200) {
            console.log(res);
            // rjagait: redirect to song details
          }
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
  }

}
