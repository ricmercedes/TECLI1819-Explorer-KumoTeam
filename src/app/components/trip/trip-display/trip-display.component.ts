import { Component, OnInit } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { TranslatableComponent } from '../../translatable/translatable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TripService } from '../../../services/trip.service';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-trip-display',
  templateUrl: './trip-display.component.html',
  styleUrls: ['./trip-display.component.css']
})
export class TripDisplayComponent extends TranslatableComponent implements OnInit {
  trip = new Trip();
  id: string;

  constructor(
    private application: ApplicationService,
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute,
    private translateSerice: TranslateService) {

    super(translateSerice);
    // this.filteredTrips = this.trips;
    // this.listFilter = '';
  }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];


    this.tripService.getTrip(this.id)
      .then((val) => {
        this.trip = val;
        console.log('trip detail: ' + this.trip.id);
      }).catch((err) => {
        console.error(err);
      });



    // this.tripService.getTrip(this.id)
    // .then ((val) => {
    //   this.trip = val;
    //   console.log('trip detail: ' + this.trip.id);
    // }).catch((err) => {
    //   console.error(err);
    // });
  }
  saveApplication() {
    const currentActorId = localStorage.getItem('Actor_id');
    const jsondata = {
      status: 'CREATED',
      dateApplication: '12/03/2015',
      paid: 'NO',
      datePayment: '12/05/2015',
      dateCancelation: '',
      comments: '',
      rejectionComment: '',
      tripId: this.id,
      actorId: currentActorId
    };
    console.log(jsondata);
    this.application.postApplications(jsondata)
      .then(res => {
        console.log(res);
      });
  }
  goBack(): void {
    this.router.navigate(['/trips']);
  }
}
  //   pageTitle: string = 'Trips';
  //   showImage: boolean = false;
  // // tslint:disable-next-line: variable-name
  //   _listFilter: string;

  //   get listFilter(): string {
  //     return this._listFilter;
  //   }

  //   set listFilter(value: string) {
  //     this._listFilter = value;
  //     this.filteredTrips = this.listFilter ? this.performFilter(this.listFilter) : this.trips;
  //   }

  //   filteredTrips: Trip[];
  //   trips: Trip[] = [
  //     {
  //       id: '01',
  //       version: 1,
  //       ticker: '1234-MMMN',
  //       title: 'Barcelona',
  //       description: 'Viaja a Barcelona',
  //       canceledReason: '',
  //       dateInit: 'March 19, 2015',
  //       dateEnd: 'March 23, 2015',
  //       pictures: '',
  //       stages: {},
  //       comments: {},
  //       sponsorShips: {},
  //       created: 'March 17, 2015',
  //       status: 'CREATED'
  //     },
  //     {
  //       id: '02',
  //       version: 1,
  //       ticker: '1234-MKMN',
  //       title: 'Paris',
  //       description: 'Viaja a Paris',
  //       canceledReason: '',
  //       dateInit: 'Agosto 19, 2015',
  //       dateEnd: 'Agosto 23, 2015',
  //       pictures: '',
  //       stages: {},
  //       comments: {},
  //       sponsorShips: {},
  //       created: 'Agosto 17, 2015',
  //       status: 'CREATED'
  //     }
  //   ];

  // performFilter(filterBy: string): Trip[] {
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.trips.filter((trip: Trip) =>
  //       trip.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  // }

  // toggleImage(): void {
  //   this.showImage = !this.showImage;
  // }
