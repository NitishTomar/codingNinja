import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private httpClient: HttpClient) { }
  public getEvents(key): Observable<Object>
  {
    // let key:any = {
    //   event_category: 'CODING_EVENT',
    //   event_sub_category: 'All Time Favorites',
    //   tag_list:'Campus Event',
    //   offset: 8
    // }

    // console.log();

    // let param = new HttpParams().set("key", key);

    return this.httpClient.get("https://api.codingninjas.com/api/v3/events", {params: key});
  }

  public getTags(): Observable<Object>
  {
    return this.httpClient.get("https://api.codingninjas.com/api/v3/event_tags");
  }

  
}
