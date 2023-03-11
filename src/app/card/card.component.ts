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
  avatarTitle!: string;
  isModalOpen = false;
  days = 0;
  public badges = [
    { title: "Emperor", streak: 365, src: "assets/365+.png", color: "#E5E4E2" },
    { title: "Caesar", streak: 240, src: "assets/120+.png", color: "#E5E4E2" },
    { title: "Imperator", streak: 120, src: "assets/240+.png", color: "#E5E4E2" },
    { title: "Consul", streak: 60, src: "assets/60+.png", color: "#E5E4E2" },
    { title: "Praetor", streak: 30, src: "assets/30+.png", color: "#E0115F" },
    { title: "Patrician", streak: 15, src: "assets/15+.png", color: "#0F52BA" },
    { title: "Plebeian", streak: 7, src: "assets/7+.png", color: "#FFD700" },
    { title: "Soldier", streak: 3, src: "assets/3+.png", color: "#C0C0C0" },
    { title: "Brute", streak: 1, src: "assets/1+.png", color: "#CD7F32" },
    { title: "Slave", streak: 0, src: "assets/0+.png", color: "#90EE90" },
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
      // TEST
      let counts: any[] = [];
      this.badges.forEach(element => {
        counts.push(element.streak);
      });
      const closest = Math.max(...counts.filter(num => num <= this.days));
      let filteredBadge = this.badges.filter(x => x.streak == closest);
      if (filteredBadge) {
        // Commented out until I can figure out what images to use
        // this.avatarImageUrl = filteredBadge[0].src;
        this.avatarImageUrl = filteredBadge[0].src;
        this.avatarTitle = filteredBadge[0].title;
      }
    } else {
      let filteredBadge = this.badges.filter(x => x.streak == 0);
      // Commented out until I can figure out what images to use
      // this.avatarImageUrl = filteredBadge[0].src;
      this.avatarImageUrl = filteredBadge[0].src;
      this.avatarTitle = filteredBadge[0].title;
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  confirm() {
    this.isModalOpen = false;
  }
}
