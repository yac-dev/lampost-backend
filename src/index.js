import http from 'http';
import app from './app';
import { Server } from 'socket.io';

import Chat from './models/loungeChat';
import Library from './models/library';
import LibraryAndUserRelationship from './models/libraryAndUserRelationship';
import Meetup from './models/meetup';
import User from './models/user';

import { createLoungeChat } from './services/socketControllers';

const server = http.createServer(app);

const timeout = () => {};

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  path: '/mysocket',
});

io.on('connection', (socket) => {
  console.log(`Welcome! ${socket.id} is connected now.`, io.sockets.adapter.rooms);
  // 最初のloginやらsignup、app reload時に、一気に自分のupcoming meetupのroomにjoinする。
  // socket.on('SEND_TEST_MESSAGE', (data) => {
  //   io.to(data.id).emit('YOUR_TEST_MESSAGE_OK', { message: 'SUCCESS!' });
  // });

  socket.on('JOIN_LOUNGES', (data) => {
    socket.join(data.meetupIds);
    console.log(io.sockets.adapter.rooms);
  });
  // meetupにjoinした時に、そのmeetupのloungeに入る。
  socket.on('JOIN_A_LOUNGE', (data) => {
    socket.join(data.meetupId);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('LEAVE_A_LOUNGE', (data) => {
    socket.leave(data.meetupId);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('I_SEND_A_CHAT', (data) => {
    createLoungeChat(io, socket, data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} lefted.`, io.sockets.adapter.rooms);
  });
});

server.listen(3500, () => {
  console.log('listening on port 3500');
});
