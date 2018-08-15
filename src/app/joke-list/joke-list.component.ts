import { Component, OnInit } from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
import { Joke } from "../joke.model";
import { JokesService } from "../jokes.service";
import { take, mergeMap, skip, mapTo } from "rxjs/operators";

@Component({
  selector: "app-joke-list",
  templateUrl: "./joke-list.component.html",
  styleUrls: ["./joke-list.component.css"]
})
export class JokeListComponent implements OnInit {
  jokes$: Observable<Array<Joke>>;
  showNotification$: Observable<boolean>;
  update$ = new Subject<void>();

  constructor(private jokesService: JokesService) {}

  ngOnInit() {
    const initialJokes$ = this.getDataOnce();
    const updates$ = this.update$.pipe(mergeMap(() => this.getDataOnce()));
    this.jokes$ = merge(initialJokes$, updates$);
    const initialNotifications$ = this.jokesService.jokes.pipe(skip(1));
    const show$ = initialNotifications$.pipe(mapTo(true));
    const hide$ = this.update$.pipe(mapTo(false));
    this.showNotification$ = merge(show$, hide$);
  }

  private getDataOnce() {
    return this.jokesService.jokes.pipe(take(1));
  }
}
