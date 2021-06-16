import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { min } from 'rxjs/operators';
import { EventsService } from 'src/Services/events.service';
import { EventCardComponent } from './event-card/event-card.component';
import { TagComponent } from './tag/tag.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Coding Ninja Assignment';
  tags: any;
  events: Array<String> = [];
  key: any;
  selectedCategory: string;
  map: Map<string, boolean> = new Map<string, boolean>();
  selectedTags: Array<string>;
  selectedSubCategory: string;
  length = 4;
  pageSize = 10;
  dataSource: Array<String> = [];

  constructor(private eventservice: EventsService, private dialog: MatDialog) {
    this.selectedCategory = 'ALL_EVENTS';
    this.selectedSubCategory = 'All Time Favorites';
  }

  public ngOnInit() {
    this.eventservice.getTags().subscribe((res: any) => {
      this.tags = res['data'].tags;
    });

    this.key = {
      event_category: 'ALL_EVENTS',
      event_sub_category: 'All Time Favorites',
      tag_list: 'Campus Event',
      offset: 8,
    };

    this.runService(this.key);
  }

  // On click event of Main Category

  public selectCategory(event) {
    this.selectedCategory = event;

    this.key = {
      event_category: event,
      event_sub_category: 'All Time Favorites',
      tag_list: 'Campus Event',
      offset: 8,
    };

    this.runService(this.key);
  }

  // On click event of Sub category

  public selectSubCategory(event) {
    this.selectedSubCategory = event;
    this.key = {
      event_category: this.selectedCategory,
      event_sub_category: event,
      tag_list: 'Campus Event',
      offset: 8,
    };

    this.runService(this.key);
  }

  //********************** On click event of selecting tags ******************

  public selectTags(event) {
    if (this.map.has(event) == true) {
      this.map.delete(event);
    } else {
      this.map.set(event, true);
    }

    this.selectedTags = Array.from(this.map.keys());

    this.key = {
      event_category: this.selectedCategory,
      event_sub_category: this.selectedSubCategory,
      tag_list: this.selectedTags,
      offset: 8,
    };

    this.runService(this.key);
  }

  // *********** Tag filter for mobile devices *******************

  public openFilter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      tags: this.tags,
    };
    const ref = this.dialog.open(TagComponent, dialogConfig);

    ref.afterClosed().subscribe((res) => {
      if (res != undefined) {
        this.selectedTags = res;
        this.key = {
          event_category: this.selectedCategory,
          event_sub_category: this.selectedSubCategory,
          tag_list: this.selectedTags,
          offset: 8,
        };

        this.runService(this.key);
      }
    });
  }

  // ************************** Paginator change event ***************************

  onPageChange(event) {
    const start = event.pageIndex * event.pageSize;
    const end = start + event.pageSize;
    this.dataSource = this.events.slice(start, end);
  }

  // Getting data from the APIs

  runService(key) {
    this.eventservice.getEvents(this.key).subscribe((res: any) => {
      this.events = res['data']['events'];
      this.length = this.events.length;
      this.dataSource = this.events.slice(
        0,
        Math.min(this.pageSize, this.events.length)
      );
    });
  }
}
