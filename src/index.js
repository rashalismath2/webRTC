const socket=io.connect("127.0.0.1:1010");

const peerConnection=new RTCPeerConnection();


const vid= document.getElementById("local");
const client= document.getElementById("client");
const btnConnect= document.getElementById("connect");

const constraint={video:true};

var stream="";


btnConnect.addEventListener('click',()=>{
    navigator.mediaDevices.getUserMedia(constraint)
    .then((stream)=>{   
        vid.srcObject=stream;
        this.stream=stream;
        peerConnection.addStream(stream);
        peerConnection.createOffer()
            .then(sdp=>{peerConnection.setLocalDescription(sdp)})
            .then(()=>{
                console.log(peerConnection.localDescription);
                socket.emit("initoffer",peerConnection.localDescription)})  
    });
    console.log("clicked");

})


socket.on("getInitOffer",(data)=>{
    console.log("got init offer");

    navigator.mediaDevices.getUserMedia(constraint)
    .then((stream)=>{   
        vid.srcObject=stream;
        this.stream=stream;
        peerConnection.addStream(stream);
    peerConnection.setRemoteDescription(data)
        .then(()=>{peerConnection.createAnswer()})
        .then((sdp)=>{peerConnection.setLocalDescription(sdp)})
        .then(()=>{
            console.log(peerConnection.localDescription);
            socket.emit("answer",peerConnection.localDescription)})
    })

    
})


socket.on("getAnswer",(data)=>{
    console.log("Got the answer");
    peerConnection.setRemoteDescription(data);
})