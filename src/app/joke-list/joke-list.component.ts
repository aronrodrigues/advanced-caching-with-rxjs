import { Component, OnInit } from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
import { Joke } from "../joke.model";
import { JokesService } from "../jokes.service";
import { take, mergeMap, skip, mapTo, switchMap } from "rxjs/operators";

@Component({
  selector: "app-joke-list",
  templateUrl: "./joke-list.component.html",
  styleUrls: ["./joke-list.component.css"]
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;
  showNotification$: Observable<boolean>;
  update$ = new Subject<void>();
  forceReload$ = new Subject<void>();

  constructor(private jokesService: JokesService) {}

  ngOnInit() {
    const initialJokes$ = this.getDataOnce();
    const reload$ = this.forceReload$.pipe(switchMap(() => this.getNotifications()));
    const updates$ = merge(this.update$, this.forceReload$).pipe(mergeMap(() => this.getDataOnce()));
    this.jokes$ = merge(initialJokes$, updates$);
    const initialNotifications$ = this.getNotifications();
    const show$ = merge(initialNotifications$, reload$).pipe(mapTo(true));
    const hide$ = merge(this.forceReload$, this.update$).pipe(mapTo(false));
    this.showNotification$ = merge(show$, hide$);
  }

  private getDataOnce() {
    return this.jokesService.jokes.pipe(take(1));
  }

  getNotifications() {
    return this.jokesService.jokes.pipe(skip(1));
  }

  forceReload() {
    this.jokesService.forceReload();
    this.forceReload$.next();
  }
}
