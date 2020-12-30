import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;

  constructor(
    private _httpClient: HttpClient,
    private _spotifyService: SpotifyService) { }

  buscar(termino: string) {
    this.loading = true;
    this._spotifyService.getArtists(termino).subscribe((data: any) => {
      //console.log(data);
      this.artistas = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
