const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static("public"));

let userCount = 0;
let warSeason = 1;
let warScore = 0;

io.on('connection', socket => {
    userCount++;
    console.log(`A new user joined ! Users online : ${userCount}`);

    socket.on('disconnect', () => {
        userCount--;
        console.log(`An user disconnected. Users online : ${userCount}`);
    });

    io.emit('warscore', warScore);
    socket.on('updatescore', function(sign){
        io.emit('warscore', warScore);
        
        if(sign.sign == 'plus'){
            warScore++;
        }
        else if(sign.sign == 'minus') {
            warScore--;
        }
        else{
            console.log("Invalid score update.");
        }
    });
});


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});