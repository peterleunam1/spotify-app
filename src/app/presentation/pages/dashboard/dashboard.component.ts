import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { lastValueFrom } from 'rxjs';
import { PlaylistItem } from '../../../domain/playlists/playlists.entity';
import { ListOfPlaylistsComponent } from '../../components/organisms/list-of-playlists/list-of-playlists.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { PlaylistsError } from '../../../domain/playlists/playlists.errors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MainLayoutComponent,
    NavbarComponent,
    ListOfPlaylistsComponent,
    LoaderComponent
  ]
})
export class DashboardComponent implements OnInit {
  private playlistUseCase = inject(PlaylistsUseCase);
  public playlists = signal<PlaylistItem[]>([]);
  public isLoading = signal<boolean>(false);
  public errorMessages = signal<string>('');

  async getPlaylists() {
    this.isLoading.set(true);
    this.errorMessages.set('');

    try {
      const result = await lastValueFrom(this.playlistUseCase.getPlaylists());
      this.playlists.set(result.items);
    } catch (error) {
      this.errorMessages.set((error as PlaylistsError).message);
    } finally {
      this.isLoading.set(false);
    }
  }

  openPlaylist(url: string) {
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.getPlaylists();
  }
}
