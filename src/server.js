require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/music');
const MusicsService = require('./services/postgres/MusicsService');
const NotesValidator = require('./validator/musics');
const ClientError = require('./exceptions/ClientError'); //

const init = async () => {
  const musicService = new MusicsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: musicService,
      validator: NotesValidator,
    },
  });

  // Middleware untuk error handling
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.host}:${server.info.port}`);
};

init();
