import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  imports: [RouterModule, CommonModule]
})
export class SidebarItemComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() route = '';
  @Input() active = false;
}
