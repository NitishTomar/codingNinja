import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent implements OnInit {
  tags: Array<string>;
  map: Map<string, boolean> = new Map<string, boolean>();
  selectedTags: Array<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<TagComponent>
  ) {
    this.tags = data.tags;
  }

  ngOnInit(): void {}

  public selectTags(event) {
    if (this.map.has(event) == true) {
      this.map.delete(event);
    } else {
      this.map.set(event, true);
    }

    this.selectedTags = Array.from(this.map.keys());
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selectedTags);
  }
}
