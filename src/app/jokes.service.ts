import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay, switchMap, takeUntil } from "rxjs/operators";
import { JokeResponse } from "./joke-response.model";
import { Observable, timer, Subject } from "rxjs";
import { Joke } from "./joke.model";
import { environment } from "../environments/environment";

@Injectable({ providedIn: "root" })
export class JokesService {
  private reload$ = new Subject<void>();
  private cache$: Observable<Array<Joke>>;

  constructor(private http: HttpClient) {}

  get jokes() {
    if (!this.cache$) {
      const timer$ = timer(0, environment.refreshInterval);
      this.cache$ = timer$.pipe(
        switchMap(_ => this.requestJokes()),
        takeUntil(this.reload$),
        shareReplay(environment.cacheSize)
      );
    }
    return this.cache$;
  }

  private requestJokes() {
    return this.http.get<JokeResponse>(environment.apiEndpoint).pipe(
      map(response => {
        console.log(response);
        return response.value;
      })
    );
  }

  forceReload() {
    this.reload$.next();
    this.cache$ = null;
  }
}
