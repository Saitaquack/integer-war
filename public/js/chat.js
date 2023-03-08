let theChat = document.getElementById("chat");
let sendChat = document.getElementById("send-chat");
let chatInput = document.getElementById("chat-input");
let chatHide = document.getElementById("hide-chat");

let maxChatLength = 300;

function sendMessage(){
    let message = chatInput.value;
    if(message.length > 0)
    {
        socket.emit('sendchat', {
            content: message
        })
    }
    chatInput.value = '';
    chatInput.focus();
}

sendChat.addEventListener("click", function(){
    sendMessage();
});

chatHide.addEventListener("click", function(){
    theChat.classList.toggle("hidden");
    sendChat.classList.toggle("hidden");
    chatInput.classList.toggle("hidden");

    if(theChat.classList.contains("hidden")){
        chatHide.innerText = "Show Chat";
    }
    else {
        chatHide.innerText = "Hide Chat";
    }
});

chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

socket.on('updatechat', function(message){
    let p = document.createElement('p');
    p.innerText = message.content;
    if(p.innerText.length > maxChatLength)
    {
        p.innerText = message.content.substring(0, maxChatLength);
    }
    theChat.append(p);
});