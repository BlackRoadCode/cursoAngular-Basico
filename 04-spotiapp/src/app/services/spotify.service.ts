// import { } from '';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _httpClient: HttpClient) { }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAPoWDQusCvbZZV7JSsxO3VENwxxg_ayTgPk9a_wj0BkSrXhrXQMeIVyJ3G4VkuLjVmSG0hwVs5PIf1q4c'
    });

    return this._httpClient.get(url, {headers} );
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(map(data => {
        return data['albums'].items;
      }));

    /*
     * Código original, conservado solo como referencia inútil para saber cómo era el método originalmente
     * 
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQA3n3HZJmmL9sr-z4MWjKZMws0xGEOfked9wKQvicDMxUCmW3Tk4cE0OGFSsOBlq3PCaLN_Ntiec1GN1YW8qAGQVIyQYqh-ymrao2RDUC-XOQxAEJi_Y1R5Id88avvKaCEe2InsgFTaym2dIVViQA9Rk1F25Ms'
    });

    return this._httpClient.get('https://api.spotify.com/v1/browse/new-releases', { headers })
      .pipe(map(data => {
        return data['albums'].items;
      }));
      */
  }

  getArtists( termino:string ) {

    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe(map(data => {
        return data['artists'].items;
      }));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(artistId: string) {
    return this.getQuery(`artists/${artistId}/top-tracks?market=MX`)
              .pipe(map(data => { return data['tracks'] }));
  }

}
