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

  constructor(
    private _seventService: SecureEventsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.self = this._authService.getUsername();
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
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(blockName).style.display = "block";
  }
}
