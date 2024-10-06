import express from "express"

const app = express()
const port = 3000

import {createServer} from "http"
import {Server} from "socket.io"

const server = createServer(app)

const io = new Server(server,{
    cors: {
        origin: "*",
    }
})


app.get("/",(req,res)=>{

    res.send("Hello from api");
})


app.post("/",(req,res)=>{
    const data = req.body
    console.log(data)
    res.send({
        data: "processed "+data,
    })
})

io.on("connection",(socket)=>{
    console.log("User connected - ",socket.id)
    socket.on("message",(data)=>{
        console.log(data)
        io.emit("message",data)
    })
})




server.listen(port,()=>{
    console.log("Server is running on port "+port)
})