import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  avatarImageUrl!: string;
  isModalOpen = false;
  public badges = [
    { title: "gold", streak: 7, src: "assets/gold.png" },
    { title: "silver", streak: 4, src: "assets/silver.png" },
    { title: "bronze", streak: 2, src: "assets/bronze.png" },
    { title: "beginner", streak: 0, src: "assets/beginner.png" },
  ];

  constructor(private storage: Storage) {
    this.determineBadge();
  }

  ngOnInit() {

  }

  async determineBadge() {
    const storage = await this.storage.create();
    var dateStarted = await this.storage.get(this.title + 'dateStarted');
    var dateNow = new Date().getTime();
    var delta = Math.abs(dateNow - dateStarted) / 1000;
    let days = Math.floor(delta / 86400);
    let counts: any[] = [];
    this.badges.forEach(element => {
      counts.push(element.streak);
    });
    const closest = Math.max(...counts.filter(num => num <= days));
    let filteredBadge = this.badges.filter(x => x.streak == closest);
    if (filteredBadge) {
      this.avatarImageUrl = filteredBadge[0].src;
    }
  }

  changeBadge() {
    // need to do a timer for when the day has changed, figure out next
    // setInterval(() => {
    //   if()
    // }, 1000);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  confirm() {
    this.isModalOpen = false;
  }
}
