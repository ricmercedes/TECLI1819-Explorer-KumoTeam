import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
//
import { TranslateService } from '@ngx-translate/core';
//
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { TranslatableComponent } from '../../translatable/translatable.component';
import { Actor } from '../../../models/actor.model';
import { Trip } from '../../../models/trip.model';
import { Application } from '../../../models/application.model';

//
import { MessageService } from '../../../services/message.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent extends TranslatableComponent implements OnInit {
  actor: Actor;
  trip: Trip;
  data: any[];
  data1: any[];
  tripTitle = {};
  tripTicker = {};

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private applicationService: ApplicationService,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }
  ngOnInit() {

    this.applicationService.getApplications().then((val) => {
      this.data = val;
      console.log(this.data);

    }).catch((err) => console.error(err.message));
    this.actor = this.authService.getCurrentActor();

    this.tripService.getTrips()
      .then((val) => {

      $.each(val, (i, trip) => {
          this.tripTicker[trip.id] = trip.ticker;
          this.tripTitle[trip.id] = trip.title;
        });
        console.log(this.tripTicker);
        // this.data1 = val;
        // console.log(this.data1);

      }).catch((err) => console.error(err.message));
    this.actor = this.authService.getCurrentActor();

  }
}
