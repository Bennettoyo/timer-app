import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title!: string;
  @Input() dayChange!: number;
  avatarImageUrl!: string;
  isModalOpen = false;
  days = 0;
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

  ngOnChanges(val: any) {
    if (val.dayChange.currentValue) {
      this.determineBadge();
    }
  }

  async determineBadge() {
    const storage = await this.storage.create();
    var dateStarted = await this.storage.get(this.title + 'dateStarted');
    if (dateStarted) {
      var dateNow = new Date().getTime();
      var delta = Math.abs(dateNow - dateStarted) / 1000;
      this.days = Math.floor(delta / 86400);
      this.days = this.days;
      let counts: any[] = [];
      this.badges.forEach(element => {
        counts.push(element.streak);
      });
      const closest = Math.max(...counts.filter(num => num <= this.days));
      let filteredBadge = this.badges.filter(x => x.streak == closest);
      if (filteredBadge) {
        this.avatarImageUrl = filteredBadge[0].src;
      }
    } else {
      let filteredBadge = this.badges.filter(x => x.streak == 0);
      this.avatarImageUrl = filteredBadge[0].src;
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  confirm() {
    this.isModalOpen = false;
  }
}
