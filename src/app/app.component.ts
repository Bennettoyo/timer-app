import { Component, ViewChild } from '@angular/core';
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

  // Only have 2 or 3 timers for mainstream habits people want to get rid of or streaks they want to build, make the rest editable and able to add new timers 

  constructor(private dataservice: DataService) {
    this.init();
  }

  async init() {
    this.appPages = await this.dataservice.getAppPages();
  }

  addTimer() {
    const id = this.appPages[this.appPages.length - 1].id + 1;
    let results = this.appPages.filter(item => item.title == this.name);
    if (results.length == 0) {
      this.dataservice.appPages.push(
        { id: id, title: this.name, url: `/folder/${this.name}`, icon: 'timer' }
      );
      this.appPages.push(
        { id: id, title: this.name, url: `/folder/${this.name}`, icon: 'timer' }
      );
      this.name = "";
      this.dataservice.saveTimers();
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
