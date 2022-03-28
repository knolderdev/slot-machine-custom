import { Component, OnInit } from '@angular/core';
import {Slot} from '../../assets/js/Slot'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  config = {
    inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
    onSpinStart: (symbols) => {
      console.log("onSpinStart", symbols);
    },
    onSpinEnd: (symbols) => {
      console.log("onSpinEnd", symbols);
    },
  };
  constructor() { }

  ngOnInit(): void {
    const slot = new Slot(document.getElementById("slot"), this.config);
    console.log('slot ', slot);
  }
}
