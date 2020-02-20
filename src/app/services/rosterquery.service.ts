import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../interfaces/player.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RosterqueryService {
  
  private rosterUrl = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?`;
  roster: Array<Player> = [];
  // roster$: Observable<Array<Player>>

  constructor(private http: HttpClient) { }
  fetchRoster(team: string): Observable<Array<Player>> {
    const params = new HttpParams().set('team_id', `'${team}'`)
    return this.http.get<Array<Player>>(`${this.rosterUrl}`, { params })
  }
}