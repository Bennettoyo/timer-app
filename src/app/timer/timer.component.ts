import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  startTime!: number;
  storedTimeValue: any;
  days: any;
  hours: any;
  minutes: any;
  seconds: any;
  dateStarted: any;
  formattedTime: any;
  percentage: any;

  constructor(private storage: Storage) {
    this.init();
  }

  ngOnInit() { }

  async init() {
    const storage = await this.storage.create();
    var dateStarted = await this.storage.get('dateStarted');
    if (!dateStarted) {
      this.dateStarted = new Date().getTime();
    }
    this.setCountUp();
  }

  setCountUp() {
    this.setUpTimer();
    setInterval(() => {
      this.setUpTimer();
    }, 1000);
  }

  async startCounter() {
    this.dateStarted = new Date().getTime();
    await this.storage.set('dateStarted', this.dateStarted);
    this.setUpTimer();
  }

  async setUpTimer() {
    var dateStarted = await this.storage.get('dateStarted');
    var dateNow = new Date().getTime();

    var delta = Math.abs(dateNow - dateStarted) / 1000;

    this.days = Math.floor(delta / 86400);
    delta -= this.days * 86400;

    this.hours = Math.floor(delta / 3600) % 24;
    delta -= this.hours * 3600;

    this.minutes = Math.floor(delta / 60) % 60;
    delta -= this.minutes * 60;

    this.seconds = Math.floor(delta % 60);
    this.percentage = (this.hours / 24 + this.minutes / (60 * 24)) * 100
  }
}
