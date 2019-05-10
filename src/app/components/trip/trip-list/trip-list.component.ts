import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
//
import { TranslateService } from '@ngx-translate/core';
//
import { TripService } from '../../../services/trip.service';
import { AuthService } from '../../../services/auth.service';
import { TranslatableComponent } from '../../translatable/translatable.component';
import { Actor } from '../../../models/actor.model';
import { Trip } from '../../../models/trip.model';
//
import { MessageService } from '../../../services/message.service';



@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent extends TranslatableComponent implements OnInit {
  actor: Actor;
  data: any[];
  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService) {
    super(translateService);
  }

  ngOnInit() {
    this.tripService.getTrips().then((val) => {
      this.data = val;
    }).catch((err) => console.error(err.message));
    this.actor = this.authService.getCurrentActor();
  }

  newTrip(){
    this.router.navigate(['/trips/new']);
  }

}
