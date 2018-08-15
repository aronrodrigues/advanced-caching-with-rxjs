import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { JokeListComponent } from "./joke-list/joke-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent, JokeListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, MatButtonModule, MatCardModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
