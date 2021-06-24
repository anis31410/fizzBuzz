import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Fizzbuzz Game';
  number = '';
  show = false;
  returnValueNumber: String = '';

  constructor(private service : AppServiceService) {

  }


  getNumberFromServer() {
    this.service.getData().subscribe((response) => {
      console.log('RESPONSE from server is :', JSON.parse(JSON.stringify(response)).number1.number);

      // variable représentant le nombre récupéré depuis le serveur 
      const numberValue : Number = JSON.parse(JSON.stringify(response)).number1.number
      this.fizzbuzzFunction(numberValue)
      //return JSON.parse(JSON.stringify(response)).number1.number;
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  sendNumberToServer(number: Number) {
    this.service.sendNumber(number).subscribe((response) => {
    this.getNumberFromServer()
    }, (error) => {
      console.log('Error is', error)
    })
  }

  onChange(event: Number) {
    this.sendNumberToServer(event)
  }

  fizzbuzzFunction(number: any) {
    this.show = true;
    number % 15 === 0
      ? (this.returnValueNumber = 'Fizzbuzz')
      : number % 5 === 0
      ? (this.returnValueNumber = 'Buzz')
      : number % 3 === 0
      ? (this.returnValueNumber = 'Fizz')
      : (this.returnValueNumber = number);
  }

  /** contigusNumbers(returnValueNumber: String, number: any) {
    if(returnValueNumber === "Buzz") {
      if((number+1) % 3 === 0) {
        this.contigusNumbersVAlue = `Contigus Numbers `
      }
    }
  } */
}
