import { Component } from '@angular/core';
import COUNTRIES from './data/Countries';
import { Country } from './model/Country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularEjemp';

  page = 1;
	pageSize = 4;
	collectionSize = COUNTRIES.length;
	countries: Country[];

	constructor() {
		this.refreshCountries();
	}

	refreshCountries() {
		this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}


}
