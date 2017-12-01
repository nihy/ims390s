import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core/src/event_emitter';

@Component({
  selector: 'app-pass-calc',
  templateUrl: './pass-calc.component.html',
  styleUrls: ['./pass-calc.component.css']
})
export class PassCalcComponent {

  pw: string;
  attempts: number = -1;
  attemptsPerSecond: number = 1000;
  timeToBreak;
  successMsg;

  constructor() { }

  onSubmit() {
    this.attempts = Math.round(this.getTries(this.pw));
    this.timeToBreak = this.attempts / this.attemptsPerSecond;
    this.successMsg = this.secondsToString(this.timeToBreak);
  }

  changeAttempts(event: number) {
    this.attemptsPerSecond = event;
    if (this.pw)
      this.onSubmit();
  }
  // This method attempts to estimate the number of attempts an attacker
  // would have to try to brute-force a random password
  getTries(pw: string) {
    var symbolProbability = new Map<string, number>();
    var passLen = pw.length;
    var strChars = pw.split('');

    // create hashmap of appearances of each char in password string
    strChars.forEach((x) => {
      var count = symbolProbability.get(x);
      if (count)
        symbolProbability.set(x, ++count);
      else
        symbolProbability.set(x, 1);
    });

    symbolProbability.forEach((val: number, key) => {
      symbolProbability.set(key, val / passLen);
    });

    // using Claude Shannon's information entropy equation
    // H(x) = -sum(p[i] * log2(p[i])), from i = 0 to N - 1
    // where i is each character in a str of length N 
    // and p[i] is the probability of the symbol at position i
    var shannonBit = 0;
    symbolProbability.forEach((val) => {
      shannonBit += (val * Math.log2(val))
    });
    shannonBit *= -1;

    // Given the minimum average bits needed to encode our password,
    // the overall number of bits is then passLen * shannonBit 
    var totalBits = passLen * shannonBit;

    // The total number of attempts to crack our password is then
    // 2 ^ (totalBits - 1), from RFC 4086 (Eastlake, et al., pg. 4)
    return Math.pow(2, totalBits - 1);
  }

  // Converts seconds to a more readable form with other units
  // Credit to Royi Namir from https://stackoverflow.com/questions/8211744/convert-time-interval-given-in-seconds-into-more-human-readable-form
  private secondsToString(seconds) {
    var numyears = Math.floor(seconds / 31536000);
    var numdays = Math.floor((seconds % 31536000) / 86400);
    var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
    if (numseconds < 1)
      return Math.round(numseconds * 1000) + ' milliseconds'

    return numyears + " years " + numdays + " days " + numhours + " hours " + numminutes + " minutes " + Math.round(numseconds) + " seconds";
  }


}
