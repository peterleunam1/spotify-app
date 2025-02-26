import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { PlaylistsUseCase } from '../../../application/playlists/playlists.use-case';
import { lastValueFrom } from 'rxjs';
import { PlaylistsModel } from '../../../domain/playlists/playlists.entity';
import { ListOfPlaylistsComponent } from '../../components/organisms/list-of-playlists/list-of-playlists.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, MainLayoutComponent, NavbarComponent, ListOfPlaylistsComponent, LoaderComponent]
})
export class DashboardComponent implements OnInit {
  private playlistUseCase = inject(PlaylistsUseCase);
  playlists: PlaylistsModel = {} as PlaylistsModel;
  isLoading = true;
  followedPlaylists = new Set<string>(); // Estado para playlists seguidas

  async getPlaylists() {
    this.isLoading = true;
    try {
      const result = await lastValueFrom(this.playlistUseCase.getPlaylists());
      this.playlists = result;
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  openPlaylist(url: string) {
    window.open(url, '_blank');
  }

  toggleFollow(playlistId: string) {
    if (this.followedPlaylists.has(playlistId)) {
      this.followedPlaylists.delete(playlistId);
    } else {
      this.followedPlaylists.add(playlistId);
    }
  }

  isFollowed(playlistId: string): boolean {
    return this.followedPlaylists.has(playlistId);
  }

  ngOnInit() {
    this.getPlaylists();
  }
}
