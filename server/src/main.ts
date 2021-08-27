import * as express from 'express';
import * as http from 'http';
import GameStore from './GameStore';
import WebSocketForStore from './WebSocketForStore';

// Configurations
const configurations = {
    port: Number.parseInt(process.env.PORT)
};

// Store
const gameStore = new GameStore();

// App
const app = express();
app.use('/', express.static('public'));

// Server
const server = http.createServer(app);

// WebSockets
WebSocketForStore({ server, path: '/games' }, gameStore);

// Start
server.listen(configurations.port, () => {
    console.log(`Service @ ${configurations.port}`);
});
