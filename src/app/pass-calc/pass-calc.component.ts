import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pass-calc',
  templateUrl: './pass-calc.component.html',
  styleUrls: ['./pass-calc.component.css']
})
export class PassCalcComponent implements OnInit {
  private x: number;

  ngOnInit() {
  }

  private onSubmit(pw: string) {
    var x = this.calcEntropy(pw);
    console.log(x);
  }

  private calcEntropy(pw: string) {
    var entropy: number = 0; 
    var strChars = pw.split('');
    var hasUpper: boolean = false;
    var hasLower: boolean = false;
    var hasNum: boolean = false;
    var specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var hasSpecialChars = specialChars.test(pw);


    for (let i = 0; i < strChars.length; i++) {
      if (i == 0)
        entropy += 4;
      else if (i < 7)
        entropy += 2;
      else if (i < 19)
        entropy += 1.5;
      else
        entropy++;

      if (!isNaN(parseInt(strChars[i])))
        hasNum = true;
      if (strChars[i] == strChars[i].toUpperCase())
        hasUpper = true;
      if (strChars[i] == strChars[i].toLowerCase())
        hasLower = true;
    }
    
    if (hasLower && hasUpper)
      entropy += 2;
    if (hasNum)
      entropy += 2;
    if (hasSpecialChars)
      entropy += 2;

    return entropy;

  }


}
