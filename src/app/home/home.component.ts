import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showPulse: boolean = false;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    // this.dataservice.appPagesSubject.subscribe((result) => {
    //   if (result.length == 0) {
    //     this.showPulse = true;
    //   } else if (result.length > 0) {
    //     this.showPulse = false
    //   }
    //   console.log(this.showPulse);
    // })
  }

}
