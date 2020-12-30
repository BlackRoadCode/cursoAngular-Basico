import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service'

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _spotifyService: SpotifyService) {
    this._activatedRoute.params.subscribe(params => {
      //console.log(params['id']);

      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this._spotifyService.getArtist(id).subscribe(artista => {
      this.artista = artista;
      this.loading = false;
    });
  }

  getTopTracks(id: string) {
    this.loading = true;
    this._spotifyService.getTopTracks(id).subscribe(topTracks => {
      this.topTracks = topTracks;
      this.loading = false;
      //console.log(this.topTracks);
    });
  }


}
