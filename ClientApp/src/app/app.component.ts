import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { occupation } from './models/occupation';
import { occupationRatings } from './models/occupationRating';
import { OccupationService } from './services/occupation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CalculatePremium';
  premiumAmount = 0.0;
  occupations: Array<occupation> = [];
  //occupations = [
  //  { occupation: 'Cleaner', rating: 'Light Manual' },
  //  { occupation: 'Doctor', rating: 'Professional' },
  //  { occupation: 'Author', rating: 'White Collar' },
  //  { occupation: 'Farmer', rating: 'Heavy Manual' },
  //  { occupation: 'Mechanic', rating: 'Heavy Manual' },
  //  { occupation: 'Florist', rating: 'Light Manual' }
  //];
  occupationRating: Array<occupationRatings> = [];
  //occupationRating = [
  //  { rating: 'Professional', factor: 1.0 },
  //  { rating: 'White Collar', factor: 1.25 },
  //  { rating: 'Light Manual', factor: 1.50 },
  //  { rating: 'Heavy Manual', factor: 1.75 },
  //];

  premiumCalculatorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    age: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    sumAssured: new FormControl(0.0, [Validators.required, Validators.min(1)]),
    occupation: new FormControl('', [Validators.required]),
  });

  constructor(private occupationService: OccupationService) {
    this.premiumCalculatorForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
      console.log(value);
      if (value) {
        this.premiumCalculatorForm.patchValue({
          age: this.getAge(new Date(value))
        });
      }
    });
  }

  ngOnInit(): void {
    this.occupationService.getOccupations().subscribe((response: Array<occupation>) => {
      this.occupations = response;
    });

    this.occupationService.getOccupationRatings().subscribe((response: Array<occupationRatings>) => {
      this.occupationRating = response;
    });
  }

  calculatePremium() {
    if (this.premiumCalculatorForm.valid) {
      var formValues = this.premiumCalculatorForm.value;
      var ratingFactor = this.occupationRating.filter(p => p.rating == (<any>formValues.occupation).rating)[0].factor;

      this.premiumAmount = ((formValues.sumAssured ?? 0) * ratingFactor * (formValues.age ?? 0)) / (1000 * 12);

      console.log(this.premiumAmount);
    } else {
      console.log("Please fill the form correctly!!");
    }

  }

  getAge(birthDate: Date) {
    console.log('birthDate->', birthDate)
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log('age->', age)
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log('age->', age)
    return age;
  }
}
