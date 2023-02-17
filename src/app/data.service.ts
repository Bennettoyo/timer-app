import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

interface timer {
  id: number,
  title: string,
  url: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public appPages: timer[] = [
    { id: 1, title: 'Timer 1', url: '/folder/Timer 1', icon: 'timer' },
    { id: 2, title: 'Timer 2', url: '/folder/Timer 2', icon: 'timer' },
    { id: 3, title: 'Timer 3', url: '/folder/Timer 3', icon: 'timer' },
  ];

  public appPagesSubject = new Subject<timer[]>();

  constructor(private storage: Storage, private router: Router) {
    this.init();
  }

  async saveTimers() {
    await this.storage.set("appPageData", this.appPages);
  }

  removeTimer(title: string) {
    this.appPages = this.appPages.filter(timer => timer.title !== title);
    if (this.appPages.length !== 0) {
      this.appPagesSubject.next(this.appPages);
      this.saveTimers();
      let routeName = this.appPages[0].title;
      this.router.navigate(['/folder/' + routeName]);
    } else {
      alert("nah mate you'd run out of timers yeh");
    }
  }

  async getAppPages() {
    let appPageData = await this.storage.get('appPageData');
    let returnedData: timer[];
    if (appPageData) {
      returnedData = appPageData;
    } else {
      returnedData = this.appPages;
    }
    return returnedData;
  }

  async init() {
    const storage = await this.storage.create();
    let appPageData = await this.storage.get('appPageData');
    if (appPageData) {
      this.appPages = appPageData;
      this.appPagesSubject.next(appPageData)
    } else {
      this.appPagesSubject.next(this.appPages);
    }
  }
}
