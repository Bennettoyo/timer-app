import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() title: any;
  startTime!: number;
  storedTimeValue: any;
  days: any = 0;
  hours: any = 0;
  minutes: any = 0;
  seconds: any = 0;
  dateStarted: any;
  formattedTime: any;
  percentage: any;
  counterInterval: any;
  userHasStarted: boolean | undefined;
  dayText = "Days";

  constructor(private storage: Storage) {
    this.init();
  }

  ngOnInit() {
  }

  async init() {
    const storage = await this.storage.create();
    this.userHasStarted = await this.storage.get(this.title + 'userHasStarted');
    if (!this.userHasStarted) {
      this.dateStarted = new Date();
      clearInterval(this.counterInterval);
    } else {
      this.setCountUp();
    }
  }

  async daysText() {
    var dateStarted = await this.storage.get(this.title + 'dateStarted');
    var dateNow = new Date().getTime();
    var delta = Math.abs(dateNow - dateStarted) / 1000;
    this.days = Math.floor(delta / 86400);
  }

  setCountUp() {
    this.setUpTimer();
    this.counterInterval = setInterval(() => {
      this.setUpTimer();
    }, 1000);
  }

  async startCounter() {
    this.dateStarted = new Date();
    await this.storage.set(this.title + 'dateStarted', this.dateStarted);
    await this.storage.set(this.title + 'userHasStarted', true);
    this.userHasStarted = true;
    this.setCountUp();
  }

  async setUpTimer() {
    var dateStarted = await this.storage.get(this.title + 'dateStarted');
    var dateNow = new Date().getTime();
    var delta = Math.abs(dateNow - dateStarted) / 1000;
    this.days = Math.floor(delta / 86400);
    delta -= this.days * 86400;
    if (this.days == 1) {
      this.dayText = "Day"
    }
    this.hours = Math.floor(delta / 3600) % 24;
    delta -= this.hours * 3600;
    this.minutes = Math.floor(delta / 60) % 60;
    delta -= this.minutes * 60;
    this.seconds = Math.floor(delta % 60);
    this.percentage = (this.hours / 24 + this.minutes / (60 * 24)) * 100
  }
}
