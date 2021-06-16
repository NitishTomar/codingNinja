import { Component, OnInit } from '@angular/core';
import { course } from '../AppData/data';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  dataSource: Array<Object>;

  constructor() {
    this.dataSource = course.data;
  }

  ngOnInit(): void {}
}
