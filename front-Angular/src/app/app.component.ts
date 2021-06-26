import { Component } from '@angular/core';
import { AppServiceService } from './app-service.service';
import {FizzBuzzValues} from './enums/fizzBuzzValues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fizzbuzz Game';
  showContiguousNumbers = false;
  returnValueForNumber: String = '0';
  contiguousNumbersValue: String = '';
  defaultNumber: Number = 0;
  

  constructor(private service : AppServiceService) {

  }


  // récupération du nombre côté serveur
  getNumberFromServer() {
    this.service.getData().subscribe((response) => {
      console.log('RESPONSE from server is :', JSON.parse(JSON.stringify(response)).number1.number);

      // variable représentant le nombre récupéré depuis le serveur 
      const numberValue : Number = JSON.parse(JSON.stringify(response)).number1.number

      this.valueOfNumber(numberValue)
      //return JSON.parse(JSON.stringify(response)).number1.number;
    }, (error) => {
      console.log('Error is ', error)
    })
  }

  // envoi du nombre côté serveur puis récupération de ce nombre
  sendNumberToServer(number: Number) {
    this.service.sendNumber(number).subscribe((response) => {
    this.getNumberFromServer()
    }, (error) => {
      console.log('Error is', error)
    })
  }


  // fonction s'exécutant à tout changement dans l'input
  onChange(event: Number) {
    this.sendNumberToServer(event)
  }


  // fonction permettant de déterminer la valeur (fizz, buzz, fizzbuzz...) correspondant au nombre sélectionné
  // et de déterminer si le nombre suivant ou précédent permet d'effectuer une séquence fizz puis buzz ou buzz puis fizz avec ce nombre 
  valueOfNumber(number: any) {
    if(number === 0) {
      this.returnValueForNumber = '0';
    } else {
      number % 15 === 0
      ? (this.returnValueForNumber = FizzBuzzValues.fizzBuzz)
      : number % 5 === 0
      ? (this.returnValueForNumber = FizzBuzzValues.buzz)
      : number % 3 === 0
      ? (this.returnValueForNumber = FizzBuzzValues.fizz)
      : (this.returnValueForNumber = number)
    }
    this.contiguousNumbers(this.returnValueForNumber, number);
  }


  // fonction déterminant si le nombre suivant ou précédent permet d'effectuer une séquence fizz puis buzz ou buzz puis fizz avec ce nombre 
  contiguousNumbers(returnValueNumber: String, number: any) {
    if(returnValueNumber === FizzBuzzValues.buzz || returnValueNumber === FizzBuzzValues.fizz) {
      if(returnValueNumber === FizzBuzzValues.buzz) {
        this.buzzThenFizz(number);
      }
      if(returnValueNumber === FizzBuzzValues.fizz) {
        this.fizzThenBuzz(number);
      }
    } else {
      this.contiguousNumbersValue = '';
      this.showContiguousNumbers = false;
    }
   
  } 

  fizzThenBuzz(number: any) {
    if((number+1) % 5 === 0) {
      this.showContiguousNumbers = true;
      this.contiguousNumbersValue = `le nombre suivant (${number+1}) retourne la chaîne de caractère Buzz. Les nombres contigus ${number}/${number+1} m\ènent à la séquence Fizz puis Buzz`
    }
    if((number-1) % 5 === 0) {
      this.showContiguousNumbers = true;
      this.contiguousNumbersValue = `le nombre pr\éc\édent (${number-1}) retourne la chaîne de caractère Buzz. Les nombres contigus ${number-1}/${number} m\ènent à la séquence Buzz puis Fizz`
    }
  }

  buzzThenFizz(number: any) {
    if((number+1) % 3 === 0) {
      this.showContiguousNumbers = true;
      this.contiguousNumbersValue = `le nombre suivant (${number+1}) retourne la chaîne de caractère Fizz. Les nombres contigus ${number}/${number+1} m\ènent à la séquence Buzz puis Fizz`
    }
    if((number-1) % 3 === 0) {
      this.showContiguousNumbers = true;
      this.contiguousNumbersValue = `le nombre pr\éc\édent (${number-1}) retourne la chaîne de caractère Fizz. Les nombres contigus ${number-1}/${number} m\ènent à la séquence Fizz puis Buzz`
    }
  }

}
