const mapDBToAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

/* eslint-disable camelcase */
const mapDBToSongModel = ({ id, title, year, genre, performer, duration, album_id }) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
});
/* eslint-enable camelcase */

module.exports = { mapDBToAlbumModel, mapDBToSongModel };
