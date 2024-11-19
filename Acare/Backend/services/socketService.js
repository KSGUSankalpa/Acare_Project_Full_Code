// web-app/src/services/socketService.js
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export const sendDestination = (ambulanceId, destination) => {
  socket.emit('sendDestination', { driverId: ambulanceId, destination });
};