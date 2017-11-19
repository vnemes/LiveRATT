import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouteComponent } from './route/route.component';
import { SelectorComponent } from './selector/selector.component';
import { FormsModule } from '@angular/forms';
import {RouteSelectorService} from "./service/route-selector.service";



@NgModule({
  declarations: [
    AppComponent,
    RouteComponent,
    SelectorComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [RouteSelectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
