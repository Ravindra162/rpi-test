const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let raspberryPiSocket = null; // Will hold the Raspberry Pi client connection

// Serve your frontend here (optional)
app.get('/', (req, res) => {
  console.log("Server")
});

// When a client (browser or RPi) connects
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle Raspberry Pi client connection
  socket.on('register-rpi', () => {
    raspberryPiSocket = socket; // Save RPi socket
    console.log('Raspberry Pi registered');
  });

  // Handle order from the browser
  socket.on('place-order', (order) => {
    console.log('Order received from browser:', order);

    // Forward the order to the Raspberry Pi if it's connected
    if (raspberryPiSocket) {
      raspberryPiSocket.emit('new-order', order);
    } else {
      console.log('Raspberry Pi not connected');
    }
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    if (socket === raspberryPiSocket) {
      raspberryPiSocket = null;
      console.log('Raspberry Pi disconnected');
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
