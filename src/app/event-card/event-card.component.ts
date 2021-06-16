import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements OnInit {
  @Input() item: any;

  isOpen: boolean;

  constructor() {}

  ngOnInit(): void {
    if (
      this.item['registration_start_time'] < this.item['registration_end_time']
    ) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
}
