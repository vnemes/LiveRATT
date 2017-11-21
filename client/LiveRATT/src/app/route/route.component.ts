import {Component, Input, OnInit} from '@angular/core';
import {RouteContainer} from "./routecontainer";
import {Route} from "./route";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent {
  @Input()  selectedRouteChild:RouteContainer;
  @Input() private direction:String;

  constructor() {
  }

  getRouteByDirection():Route{
    console.log(this.selectedRouteChild);
    return this.direction == "inbound" ? this.selectedRouteChild.inbound : this.selectedRouteChild.outbound;
  }


}
