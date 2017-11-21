import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Selector} from "./selector";
import {RouteSelectorService} from "../service/route-selector.service";
import {RouteContainer} from "../route/routecontainer";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  selectedRouteMaster:RouteContainer;
  selectorArr: Observable<Selector[]>;
  constructor(private routeSelServ: RouteSelectorService) {
  }

  updateCurrentSelection(id){
    this.routeSelServ.getRoute(id).subscribe( resp => {
      console.log(resp.inbound.routeName);
      this.selectedRouteMaster = resp;
    });
    console.log("Selected route: "+id);
  }

  ngOnInit() {
    this.selectorArr = this.routeSelServ.getSelectors();
    //this.routeSelServ.initAllRoutes(); // can be used at init in order to cache the routes locally
    this.routeSelServ.getRoute('1').subscribe(resp => {
      console.log(resp.inbound.routeName);
      this.selectedRouteMaster = resp;
    });
  }

}
