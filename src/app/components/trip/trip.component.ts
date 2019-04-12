import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  pageTitle: string = 'Trips';
  showImage: boolean = false;
// tslint:disable-next-line: variable-name
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTrips = this.listFilter ? this.performFilter(this.listFilter) : this.trips;
  }

  filteredTrips: Trip[];
  trips: Trip[] = [
    {
      id: '01',
      version: 1,
      ticker: '1234-MMMN',
      title: 'Barcelona',
      description: 'Viaja a Barcelona',
      canceledReason: '',
      dateInit: 'March 19, 2015',
      dateEnd: 'March 23, 2015',
      pictures: '',
      stages: {},
      comments: {},
      sponsorShips: {},
      created: 'March 17, 2015',
      status: 'CREATED'
    },
    {
      id: '02',
      version: 1,
      ticker: '1234-MKMN',
      title: 'Paris',
      description: 'Viaja a Paris',
      canceledReason: '',
      dateInit: 'Agosto 19, 2015',
      dateEnd: 'Agosto 23, 2015',
      pictures: '',
      stages: {},
      comments: {},
      sponsorShips: {},
      created: 'Agosto 17, 2015',
      status: 'CREATED'
    }
  ];
  constructor() {
    this.filteredTrips = this.trips;
    this.listFilter = 'Paris';
  }

  performFilter(filterBy: string): Trip[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.trips.filter((trip: Trip) =>
        trip.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('In OnInit');
  }

}
