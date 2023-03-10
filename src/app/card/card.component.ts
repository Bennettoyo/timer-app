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
    { title: "platinum", streak: 60, src: "assets/gold.png", color: "#E5E4E2" },
    { title: "ruby", streak: 30, src: "assets/gold.png", color: "#E0115F" },
    { title: "saphhire", streak: 14, src: "assets/gold.png", color: "#0F52BA" },
    { title: "gold", streak: 7, src: "assets/gold.png", color: "#FFD700" },
    { title: "silver", streak: 4, src: "assets/silver.png", color: "#C0C0C0" },
    { title: "bronze", streak: 2, src: "assets/bronze.png", color: "#CD7F32" },
    { title: "beginner", streak: 0, src: "assets/beginner.png", color: "#90EE90" },
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
        // Commented out until I can figure out what images to use
        // this.avatarImageUrl = filteredBadge[0].src;
        this.avatarImageUrl = filteredBadge[0].color;
        this.avatarTitle = filteredBadge[0].title;
      }
    } else {
      let filteredBadge = this.badges.filter(x => x.streak == 0);
      // Commented out until I can figure out what images to use
      // this.avatarImageUrl = filteredBadge[0].src;
      this.avatarImageUrl = filteredBadge[0].color;
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
