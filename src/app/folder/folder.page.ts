import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public day!: number;

  constructor(private activatedRoute: ActivatedRoute, private dataservice: DataService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  dayChange(event: any) {
    if (event) {
      this.day = event;
    }
  }

  removeTimer() {
    this.dataservice.removeTimer(this.folder);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to remove this timer?',
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
            this.removeTimer();
          },
        },
      ],
    });
    await alert.present();
  }
}
