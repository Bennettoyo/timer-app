import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public appPages = [
    { title: 'Timer 1', url: '/folder/Timer 1', icon: 'timer' },
    { title: 'Timer 2', url: '/folder/Timer 2', icon: 'timer' },
    { title: 'Timer 3', url: '/folder/Timer 3', icon: 'timer' },
    { title: 'Timer 4', url: '/folder/Timer 4', icon: 'timer' },
    { title: 'Timer 5', url: '/folder/Timer 5', icon: 'timer' },
  ];

  constructor() {

  }
}
