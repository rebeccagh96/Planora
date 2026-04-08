import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class Notification {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';

  visible = false;

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, 3000);
  }
}
