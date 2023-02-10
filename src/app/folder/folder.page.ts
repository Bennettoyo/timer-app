import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public day!: number;

  constructor(private activatedRoute: ActivatedRoute, private dataservice: DataService) {
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  dayChange(event: any) {
    if (event) {
      this.day = event;
    }
  }

  removeTimer() {
    this.dataservice.removeTimer(this.folder);
  }
}
