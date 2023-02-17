import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { CdTimerModule } from 'angular-cd-timer';
import { TimerComponent } from '../timer/timer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CardComponent } from '../card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    CdTimerModule,
    NgCircleProgressModule.forRoot({
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "titleColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "showInnerStroke": true
    })

  ],
  declarations: [FolderPage, TimerComponent, CardComponent]
})
export class FolderPageModule { }
