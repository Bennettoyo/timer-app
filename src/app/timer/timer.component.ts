import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() title: any;
  @Output() dayEvent = new EventEmitter<number>();
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
  isModalOpen = false;
  randomImg = "";
  images = [
    { src: "assets/memes/1.jpg" },
    { src: "assets/memes/2.jpg" },
    { src: "assets/memes/3.jpg" },
    { src: "assets/memes/4.jpg" },
    { src: "assets/memes/5.jpg" },
    { src: "assets/memes/6.jpg" },
    { src: "assets/memes/7.jpg" },
    { src: "assets/memes/8.jpg" },
    { src: "assets/memes/9.jpg" },
    { src: "assets/memes/10.jpg" },
    { src: "assets/memes/11.jpg" },
    { src: "assets/memes/12.jpg" },
    { src: "assets/memes/13.jpg" },
    { src: "assets/memes/14.jpg" },
    { src: "assets/memes/15.jpg" },
    { src: "assets/memes/16.jpg" },
    { src: "assets/memes/17.jpg" },
    { src: "assets/memes/18.jpg" },
    { src: "assets/memes/19.jpg" },
    { src: "assets/memes/20.jpg" },
    { src: "assets/memes/21.jpg" },
    { src: "assets/memes/22.jpg" },
    { src: "assets/memes/23.jpg" },
    { src: "assets/memes/24.jpg" },
    { src: "assets/memes/25.jpg" },
    { src: "assets/memes/26.jpg" },
    { src: "assets/memes/27.jpg" },
    { src: "assets/memes/28.jpg" },
    { src: "assets/memes/29.jpg" },
    { src: "assets/memes/30.jpg" },
    { src: "assets/memes/31.jpg" },
    { src: "assets/memes/32.jpg" },
    { src: "assets/memes/33.jpg" },
    { src: "assets/memes/34.jpg" },
    { src: "assets/memes/35.jpg" },
    { src: "assets/memes/36.jpg" },
    { src: "assets/memes/37.jpg" },
    { src: "assets/memes/38.jpg" },
    { src: "assets/memes/39.jpg" },
    { src: "assets/memes/41.jpg" },
    { src: "assets/memes/42.jpg" },
    { src: "assets/memes/43.jpg" },
    { src: "assets/memes/44.jpg" },
    { src: "assets/memes/45.jpg" },
    { src: "assets/memes/46.jpg" },
    { src: "assets/memes/47.jpg" },
  ]

  constructor(private storage: Storage, private alertController: AlertController) {
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
      this.dayEvent.emit(this.days);
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

  getRandomImg() {
    this.randomImg = this.images[Math.floor(Math.random() * this.images.length)].src;
  }

  setOpen(isOpen: boolean) {
    this.getRandomImg();
    this.isModalOpen = true;
  }

  onWillDismiss(event: Event) {
    this.isModalOpen = false;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to restart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.startCounter();
          },
        },
      ],
    });
    await alert.present();
  }

}
