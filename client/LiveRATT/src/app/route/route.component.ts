import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireDatabase} from "angularfire2/database";
import {RouteContainer} from "../routecontainer";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent {
  items: Observable<RouteContainer[]>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('routes/').valueChanges();
  }

}
