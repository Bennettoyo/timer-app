import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private storage: Storage) {
    this.init();
  }

  async saveTimers() {
    await this.storage.set("appPageData", this.appPages);
  }

  removeTimer(title: string) {
    console.log("remove timer param", title);
    this.appPages = this.appPages.filter(timer => timer.title !== title);
    console.log(this.appPages);
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
    }
  }
}
