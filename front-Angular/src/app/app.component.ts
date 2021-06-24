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
  showContigusNumbersFizzBuzz = false;
  returnValueNumber: String = '0';
  contigusNumbersValue: String = '';
  defaultNumber: Number = 0;

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
    if(number === 0) {
      this.returnValueNumber = '';
    } else {
      number % 15 === 0
      ? (this.returnValueNumber = 'Fizzbuzz')
      : number % 5 === 0
      ? (this.returnValueNumber = 'Buzz')
      : number % 3 === 0
      ? (this.returnValueNumber = 'Fizz')
      : (this.returnValueNumber = number)
    }
    this.contigusNumbers(this.returnValueNumber, number);
  }

  contigusNumbers(returnValueNumber: String, number: any) {
    if(returnValueNumber === "Buzz" || returnValueNumber === "Fizz") {
      if(returnValueNumber === "Buzz") {
        this.buzzThenFizz(number);
      }
      if(returnValueNumber === "Fizz") {
        this.fizzThenBuzz(number);
      }
    } else {
      this.contigusNumbersValue = '';
      this.showContigusNumbersFizzBuzz = false;
    }
   
  } 

  fizzThenBuzz(number: any) {
    if((number+1) % 5 === 0) {
      this.showContigusNumbersFizzBuzz = true;
      this.contigusNumbersValue = `le nombre suivant retourne la chaîne de caractère Buzz. Les nombres contigus ${number}/${number+1} donnent la séquence Fizz puis Buzz`
    }
    if((number-1) % 5 === 0) {
      this.showContigusNumbersFizzBuzz = true;
      this.contigusNumbersValue = `le nombre pr\éc\édent retourne la chaîne de caractère Buzz. Les nombres contigus ${number-1}/${number} donnent la séquence Buzz puis Fizz`
    }
  }

  buzzThenFizz(number: any) {
    if((number+1) % 3 === 0) {
      this.showContigusNumbersFizzBuzz = true;
      this.contigusNumbersValue = `le nombre suivant retourne la chaîne de caractère Fizz. Les nombres contigus ${number}/${number+1} donnent la séquence Buzz puis Fizz`
    }
    if((number-1) % 3 === 0) {
      this.showContigusNumbersFizzBuzz = true;
      this.contigusNumbersValue = `le nombre pr\éc\édent retourne la chaîne de caractère Fizz. Les nombres contigus ${number-1}/${number} donnent la séquence Fizz puis Buzz`
    }
  }

}
