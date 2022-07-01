import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public userLog: number;
  public status: boolean = false;

  constructor() {}

  ngOnInit() {
    this.userLog = localStorage.length;
    console.log(localStorage);
  }

  isStatus($event) {
    this.status = !this.status;
  }
}
