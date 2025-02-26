import { AlbumInfo, AlbumsModel } from "../../domain/albums/albums.entity";



export function extractAlbumInfo(albumsData: AlbumsModel): AlbumInfo[] {
    return albumsData.items.map(album => ({
        id: album.id,
        name: album.name,
        coverImage: album.images.length > 0 ? album.images[0].url : "", // Usa la primera imagen si está disponible
        releaseYear: new Date(album.release_date).getFullYear(),
        artistName: album.artists.length > 0 ? album.artists[0].name : "Unknown"
    }));
}
