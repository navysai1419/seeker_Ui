// shared.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  subscreenToggle: EventEmitter<void> = new EventEmitter<void>();

  toggleSubscreen() {
    this.subscreenToggle.emit();
  }
}
