import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Selector} from "../selector";
import {Observable} from "rxjs/Observable";
import {RouteContainer} from "../routecontainer";

@Injectable()
export class RouteSelectorService {
  private selectorArr: Observable<Selector[]> = null;
  private selectedRoute:Observable<RouteContainer>;
  private allRoutes:Observable<RouteContainer[]>;

  constructor(private db: AngularFireDatabase) {
  }

  getSelectors() : Observable<Selector[]>{
    this.selectorArr = this.db.list('categories/').valueChanges();
    return this.selectorArr;
  }

  getRoute(id) : Observable<RouteContainer>{
    this.selectedRoute = this.db.object('routes/'+id).valueChanges();
    return this.selectedRoute;
  }

  // used for retrieving all routes in the beginning in order to cache them locally
  initAllRoutes(){
    this.allRoutes = this.db.list('routes').valueChanges();
  }
}
