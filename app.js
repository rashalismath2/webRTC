const express=require("express");
const socket=require("socket.io");

var app=express();



var server=app.listen(1010,()=>{
    console.log("server started");
})

const io=socket(server);

app.use("/src",express.static("src"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})


io.on("connection",(client)=>{
    console.log("client connected");

    client.on("initoffer",(data)=>{
        console.log("init offer recieved to the server");
        client.broadcast.emit("getInitOffer",data);
    });

    client.on("answer",(data)=>{
        console.log("answer recieved to the server");
        client.broadcast.emit("getAnswer",data);
    });


    client.on("disconnect",()=>{
        console.log("client disconnected");
    });
});


