import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
private apiKey = 'AIzaSyAe26LOE06kJLWt0TOHoIu1-2geOS5hnm0';
private playList = 'UUuaPTYj15JSkETGnEseaFFg';
private nextPageToken = '';


  constructor( private _httpClient:HttpClient ) { }

  getVideos(){
    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams()
    .set('key', this.apiKey)
    .set('part', 'snippet')
    .set('maxResults', '10')
    .set('playlistId', this.playList)
    .set('pageToken', this.nextPageToken)
    
    return this._httpClient.get<YoutubeResponse>( url, { params } ).pipe(
      map( resp => {
        this.nextPageToken = resp.nextPageToken;
        return resp.items;
      }),
      map( items =>{
        return items.map( video => video.snippet )
      } )
    );
  }
}
