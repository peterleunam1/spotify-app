import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainLayoutComponent } from '../../components/templates/main-layout/main-layout.component';
import { AlbumsUseCase } from '../../../application/albums/albums.use-case';
import { lastValueFrom } from 'rxjs';
import { AlbumInfo, AlbumsModel } from '../../../domain/albums/albums.entity';
import { extractAlbumInfo } from '../../helpers/get-filtered-albums-data';
import { ListOfAlbumsComponent } from '../../components/organisms/list-of-albums/list-of-albums.component';
import { NavbarComponent } from "../../components/molecules/navbar/navbar.component";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
  imports: [MainLayoutComponent, ListOfAlbumsComponent, NavbarComponent]
})
export class AlbumsComponent {
  private route = inject(ActivatedRoute);
  private albumsUseCase = inject(AlbumsUseCase);
  albumsResponse: AlbumsModel = {} as AlbumsModel;
  albums: AlbumInfo[] = [];

  async getAlbums(singerId: string) {
    try {
      const result = await lastValueFrom(this.albumsUseCase.getAlbums(singerId))
      this.albumsResponse = result;
      this.albums = extractAlbumInfo(this.albumsResponse);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAlbums(params['singerId']);
    });
  }
}
