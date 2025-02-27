import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { lastValueFrom } from 'rxjs';
import { AlbumInfo, AlbumsModel } from '../../../domain/albums/albums.entity';
import { extractAlbumInfo } from '../../helpers/get-filtered-albums-data';
import { ListOfAlbumsComponent } from '../../components/organisms/list-of-albums/list-of-albums.component';
import { NavbarComponent } from '../../components/molecules/navbar/navbar.component';
import { LoaderComponent } from '../../components/atoms/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  imports: [
    MainLayoutComponent,
    ListOfAlbumsComponent,
    NavbarComponent,
    LoaderComponent,
    CommonModule
  ]
})
export class AlbumsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private albumsUseCase = inject(AlbumsUseCase);
  albumsResponse: AlbumsModel = {} as AlbumsModel;
  albums: AlbumInfo[] = [];
  isLoading = false;
  artistName = 'Unknown Artist';

  async getAlbums(singerId: string) {
    try {
      this.isLoading = true;
      const result = await lastValueFrom(
        this.albumsUseCase.getAlbums(singerId)
      );
      this.albumsResponse = result;
      this.albums = extractAlbumInfo(this.albumsResponse);
      this.artistName = this.albums[0]?.artistName || 'Unknown Artist';
    } catch {
      throw new Error('An unexpected error has been ocurred.');
    } finally {
      this.isLoading = false;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAlbums(params['singerId']);
    });
  }
}
