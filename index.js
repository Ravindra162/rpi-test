import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.get("/", (req, res) => {
    res.send("Hello from API");
});

io.on("connection", (socket) => {
    console.log("User connected - ", socket.id);

    socket.on("order", (data) => {
        console.log(data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected - ", socket.id);
    });
});

server.listen(port, () => {
    console.log("Server is running on port " + port);
});
