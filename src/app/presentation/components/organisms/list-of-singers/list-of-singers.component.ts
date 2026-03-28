import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleSingerModel } from '../../../../domain/singers/singer.entity';
import { SingerComponent } from '../../molecules/singer/singer.component';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-list-of-singers',
  templateUrl: './list-of-singers.component.html',
  imports: [SingerComponent, CommonModule, SkeletonComponent]
})
export class ListOfSingersComponent {
  @Input() singers: SingleSingerModel[] = [];
  @Input() showRemoveButton = false;
  @Input() isLoading = false;
  @Output() remove = new EventEmitter<string>();
}
