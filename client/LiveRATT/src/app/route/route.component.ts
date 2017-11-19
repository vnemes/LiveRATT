import {Component, Input} from '@angular/core';
import {RouteContainer} from "../routecontainer";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent {
  @Input() private selectedRouteChild:RouteContainer;
  @Input() private direction:String;
  constructor() {
  }

}
