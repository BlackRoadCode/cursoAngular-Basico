import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  newReleases: any[] = [];
  loading: boolean;
  error: boolean;

  codigoError: string;
  mensajeError: string;

  constructor(
    private _httpClient: HttpClient,
    private _spotifyService: SpotifyService) {

    this.loading = true;
    this.error = false;

    this._spotifyService.getNewReleases().subscribe((data: any) => {
      //console.log( data );
      this.newReleases = data;
      this.loading = false;
    }, (errorService) => {
        this.loading = false;
        this.error = true;

        this.codigoError = errorService.error.error.status;
        this.mensajeError = errorService.error.error.message;

    });

  }

  ngOnInit(): void { }

}
