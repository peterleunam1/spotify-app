import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, debounceTime, switchMap, finalize } from 'rxjs';
import { SingerUseCase } from '../../../application/singers/singers.use-case';
import {
  SingerResponse,
  SingleSingerModel
} from '../../../domain/singers/singer.entity';
import { SingersMapper } from './mappers/singers.mapper';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { ListOfSingersComponent } from '../../components/organisms/list-of-singers/list-of-singers.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { categories } from '../../constants/categories.constant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [MainLayoutComponent, CommonModule, NavbarComponent, ListOfSingersComponent, LoaderComponent]
})
export class SearchComponent {
  private singerUseCase = inject(SingerUseCase);
  private singerMapper = new SingersMapper();

  private keywordSubject = new BehaviorSubject<string>('');
  listSingers: SingleSingerModel[] = [];
  isLoading = false; 
  categories = categories;
  
  constructor() {
    this.keywordSubject.asObservable()
      .pipe(
        debounceTime(500), 
        switchMap(keyword => {
          this.isLoading = true; 
          return this.singerUseCase.getAnArtist(keyword).pipe(
            finalize(() => (this.isLoading = false)),
            catchError(error => {
              console.error(error);
              return [];
            })
          );
        })
      )
      .subscribe((result: SingerResponse) => {
        this.listSingers = result?.artists?.items?.map(this.singerMapper.mapTo) ?? [];
      });
  }

  get keyword(): string {
    return this.keywordSubject.value;
  }

  set keyword(value: string) {
    this.keywordSubject.next(value);
  }
}
