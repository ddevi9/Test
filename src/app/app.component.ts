import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'durga';
  premiumAmount = 0.0;
  occupations = [
    { occupation: 'Cleaner', rating: 'Light Manual' },
    { occupation: 'Doctor', rating: 'Professional' },
    { occupation: 'Author', rating: 'White Collar' },
    { occupation: 'Farmer', rating: 'Heavy Manual' },
    { occupation: 'Mechanic', rating: 'Heavy Manual' },
    { occupation: 'Florist', rating: 'Light Manual' }
  ];
  occupationRating = [
    { rating: 'Professional', factor: 1.0 },
    { rating: 'White Collar', factor: 1.25 },
    { rating: 'Light Manual', factor: 1.50 },
    { rating: 'Heavy Manual', factor: 1.75 },
  ];
  
  premiumCalculatorForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(4)]),
    age: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]),
    dateOfBirth: new FormControl('', [Validators.required]),
    sumAssured: new FormControl(0.0, [Validators.required, Validators.min(1)]),
    occupation: new FormControl('', [Validators.required]),
  });

  constructor(){
    this.premiumCalculatorForm.get('dateOfBirth')?.valueChanges.subscribe(value => {
    console.log(value);
    //Date dob = new Date(value);
    if(value){
      this.premiumCalculatorForm.patchValue({
        age: this.getAge(new Date(value)) 
      });
      //console.log('test')
      //this.premiumCalculatorForm.get('age')?.setValue(this.getAge(new Date(value)));
    }
  });
}

  calculatePremium(){
    if(this.premiumCalculatorForm.valid){
      var formValues = this.premiumCalculatorForm.value;
      var ratingFactor = this.occupationRating.filter(p=>p.rating == (<any>formValues.occupation).rating)[0].factor;

      this.premiumAmount = ((formValues.sumAssured ?? 0) * ratingFactor * (formValues.age ?? 0)) / (1000 * 12);

      console.log(this.premiumAmount);
    } else {
      console.log("Please fill the form correctly!!");
    }
  }

  getAge(birthDate: Date) 
  {
    console.log('birthDate->', birthDate)
      var today = new Date();
      //var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      console.log('age->', age)
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      console.log('age->', age)
      return age;
  }
  // calculateAge(dateOfBirth) { // dateOfBirth is a date
  //   var ageDifMs = Date.now() - dateOfBirth;
  //   var ageDate = new Date(ageDifMs); // miliseconds from epoch
  //   return Math.abs(ageDate.getUTCFullYear() - 1970);
  // }
}
