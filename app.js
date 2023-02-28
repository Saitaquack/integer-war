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
    io.emit('season', warSeason);
    socket.on('updatescore', function(data){
        
        if(data.value == 'add'){
            warScore++;
        }
        else if(data.value == 'sub') {
            warScore--;
        }
        else{
            console.log("Invalid score update.");
        }
        io.emit('warscore', warScore);
    });
});


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});