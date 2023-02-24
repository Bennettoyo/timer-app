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
    { src: "https://rare-gallery.com/uploads/posts/964777-motivational-philosophy-memes-simple-minimalism.png" },
    { src: "https://u2y6a8h5.rocketcdn.me/wp-content/uploads/2022/11/7.png" },
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
