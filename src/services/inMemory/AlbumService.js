const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const SongService = require('./SongsService');

class AlbumService {
  constructor() {
    this._album = [];
    this._song = new SongService();
  }

  addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const newAlbum = {
      name,
      year,
      id,
    };

    this._album.push(newAlbum);

    const isSuccess = this._album.filter((album) => album.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbumById(id) {
    const album = this._album.filter((n) => n.id === id)[0];
    if (!album) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const songs = this._songService.getSongsByAlbumId(id);
    return { ...album, songs };
  }

  editAlbumById(id, { name, year }) {
    const index = this._album.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }

    this._album[index] = {
      ...this._album[index],
      name,
      year,
    };
  }
}

module.exports = AlbumService;
