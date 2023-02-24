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
    // { id: 1, title: 'Timer Test 1', url: '/folder/Timer Test 1', icon: 'timer' },
    // { id: 2, title: 'Timer Test 2', url: '/folder/Timer Test 2', icon: 'timer' },
    // { id: 3, title: 'Timer Test 3', url: '/folder/Timer Test 3', icon: 'timer' },
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
    this.appPagesSubject.next(this.appPages);
    this.saveTimers();
    if (this.appPages.length > 0) {
      let routeName = this.appPages[0].title;
      this.router.navigate(['/folder/' + routeName]);
    } else {
      this.router.navigate(['/folder/home-no-one-will-choose-this']);
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
