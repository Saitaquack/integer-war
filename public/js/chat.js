let theChat = document.getElementById("chat");
let sendMessage = document.getElementById("send-chat");
let chatInput = document.getElementById("chat-input");

sendMessage.addEventListener("click", function(){
    let message = chatInput.value;
    if(message.length > 0)
    {
        console.log("Oui !")
        socket.emit("sendchat", {
            message: message
        })
    }
})

socket.on('updatechat', function(message){

});