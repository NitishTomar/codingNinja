import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { practiceData } from '../AppData/practiceData';
import { course } from '../AppData/data';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent {
  isClosed: boolean = true;
  panelOpenState = false;
  courseData: Array<object> = [];
  pracDataSource: Array<object> = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.pracDataSource =
      practiceData.data; /*    Data From the practiceData.ts file         */
    this.courseData = course.data;
  }

  doClose() {
    this.isClosed = false;
  }
}
