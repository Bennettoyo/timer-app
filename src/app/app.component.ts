import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { DataService } from './data.service';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('myInput') myInput!: IonInput;
  appPages!: timer[];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  autofocus: boolean = true;
  isModalOpen = false;

  constructor(private dataservice: DataService, private router: Router, private toastr: ToastrService) {
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
      this.dataservice.saveTimers().then(() => {
        this.appPages = this.dataservice.appPages;
        this.router.navigate(['folder/' + this.name]);
        this.toastr.success('Timer Added!');
        this.name = "";
      });
      this.isModalOpen = false;
      this.modal.dismiss(this.name, 'confirm');
    } else {
      this.toastr.error('Timer name already in use.', 'Sorry!');
    }
  }

  confirm() {
    if (this.name) {
      this.addTimer();
    }
  }

  setOpen(isOpen: boolean) {
    setTimeout(() => {
      if (this.myInput) {
        this.myInput.setFocus();
      }
    }, 100);
    this.isModalOpen = isOpen;
  }
}
