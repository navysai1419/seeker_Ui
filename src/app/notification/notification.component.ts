import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
  @Input() message: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
