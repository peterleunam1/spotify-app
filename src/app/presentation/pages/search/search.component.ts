import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  switchMap,
  finalize,
  of
} from 'rxjs';
import { SingerUseCase } from '../../../application/singers/singers.use-case';
import {
  SingerResponse,
  SingleSingerModel
} from '../../../domain/search/search.entity';
import {
  AlbumsMapper,
  SingersMapper,
  TracksMapper
} from '../../../application/artist/singers.mapper';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { ListOfSingersComponent } from '../../components/organisms/list-of-singers/list-of-singers.component';
import { categories } from '../../constants/categories.constant';
import { mergeSearchResults } from '../../helpers/get-merged-result';
import { tap, filter } from 'rxjs';
import { getRecentSearches } from '../../helpers/get-recent-searches';
import { SkeletonComponent } from '../../components/atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  imports: [
    MainLayoutComponent,
    CommonModule,
    NavbarComponent,
    ListOfSingersComponent,
    SkeletonComponent
  ]
})
export class SearchComponent {
  private singerUseCase = inject(SingerUseCase);
  private singerMapper = new SingersMapper();
  private albumsMapper = new AlbumsMapper();
  private tracksMapper = new TracksMapper();
  recentSearches: SingleSingerModel[] = [];

  private keywordSubject = new BehaviorSubject<string>('');
  listSingers: SingleSingerModel[] = [];
  isLoading = false;
  categories = categories;

  removeRecentSearch(id: string) {
    this.recentSearches = this.recentSearches.filter(item => item.id !== id);

    localStorage.setItem(
      'recent_searches',
      JSON.stringify(this.recentSearches)
    );
  }

  clearRecentSearches() {
    this.recentSearches = [];

    localStorage.removeItem('recent_searches');
  }

  constructor() {
    this.recentSearches = getRecentSearches();

    this.keywordSubject
      .asObservable()
      .pipe(
        debounceTime(200),

        tap(keyword => {
          if (!keyword.trim()) {
            this.listSingers = [];
          }
        }),

        filter(keyword => keyword.trim().length > 0),

        switchMap(keyword => {
          this.isLoading = true;

          return this.singerUseCase.getAnArtist(keyword).pipe(
            finalize(() => (this.isLoading = false)),
            catchError(() => {
              this.listSingers = [];
              return of({} as SingerResponse);
            })
          );
        })
      )
      .subscribe((result: SingerResponse) => {
        const artists =
          result?.artists?.items?.map(this.singerMapper.mapTo) ?? [];
        const albums =
          result?.albums?.items?.map(this.albumsMapper.mapTo) ?? [];
        const tracks =
          result?.tracks?.items?.map(this.tracksMapper.mapTo) ?? [];

        this.listSingers = mergeSearchResults(artists, albums, tracks);
      });
  }

  get keyword(): string {
    return this.keywordSubject.value;
  }

  set keyword(value: string) {
    this.keywordSubject.next(value);
  }
}
