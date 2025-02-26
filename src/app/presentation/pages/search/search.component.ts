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

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [MainLayoutComponent, CommonModule, NavbarComponent, ListOfSingersComponent]
})
export class SearchComponent {
  private singerUseCase = inject(SingerUseCase);
  private singerMapper = new SingersMapper();

  private keywordSubject = new BehaviorSubject<string>('');
  listSingers: SingleSingerModel[] = [];
  isLoading = false; // 🔹 Nueva variable de estado para el loading

  categories = [
    { name: "Discover", color: "#1DB954" },  // Verde Spotify
    { name: "Podcasts", color: "#E13300" },  // Rojo     // Rosa fuerte
    { name: "Pop", color: "#148A08" },       // Verde claro
    { name: "Electronic", color: "#009688" }, // Azul verdoso
    { name: "Jazz", color: "#FF9800" }       // Naranja
  ];
  constructor() {
    this.keywordSubject.asObservable()
      .pipe(
        debounceTime(500), // Espera 500ms antes de hacer la petición
        switchMap(keyword => {
          this.isLoading = true; // ⬆ Activa el loading antes de la petición
          return this.singerUseCase.getAnArtist(keyword).pipe(
            finalize(() => (this.isLoading = false)), // ⬇ Desactiva el loading cuando termina la petición
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

  // Getter y setter para [(keyword)]
  get keyword(): string {
    return this.keywordSubject.value;
  }

  set keyword(value: string) {
    this.keywordSubject.next(value);
  }
}
