import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DataService } from './data.service';

interface timer {
  id: number,
  title: string,
  url: string,
  icon: string
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(IonModal) modal!: IonModal;
  appPages!: timer[];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  constructor(private dataservice: DataService, private router: Router) {
    this.init();
  }

  async init() {
    this.dataservice.appPagesSubject.subscribe((result) => {
      this.appPages = result;
    })
  }

  addTimer() {
    let id = this.appPages[this.appPages.length - 1]?.id + 1;
    if (isNaN(id)) {
      id = 1
    };
    let results = this.appPages.filter(item => item.title == this.name);
    if (results.length == 0) {
      this.dataservice.appPages.push(
        { id: id, title: this.name, url: `/folder/${this.name}`, icon: 'timer' }
      );
      this.name = "";
      this.dataservice.saveTimers().then(() => {
        this.appPages = this.dataservice.appPages;
      });
      this.modal.dismiss(this.name, 'confirm');
    } else {
      alert("nah pal");
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.name) {
      this.addTimer();
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
