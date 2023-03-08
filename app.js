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
        console.log(`A user disconnected. Users online : ${userCount}`);
    });

    socket.emit('warscore', warScore);
    socket.emit('season', warSeason);
    socket.on('updatescore', function(data){

        if(data != null)
        {
            switch(data.value)
            {
                case 'add':
                    warScore++;
                    io.emit('warscore', warScore);
                break;
                case 'sub':
                    warScore--;
                    io.emit('warscore', warScore);
                break;
                default:
                    console.log("A user sent invalid score update. They probably used the JS Console.");
            }
        }
        else
        {
            console.log("A user sent invalid data for score update. They probably used the JS Console.");
        }     
    });

    socket.on('sendchat', function(data){
        if(data != null)
        {
            io.emit('updatechat', data);
        }
        else
        {
            console.log("A user sent invalid chat message. They probably used the JS Console.")
        }
        
    });
});

/* Code to save War Score every 30 seconds if crash occures */

setInterval(() => {
    console.log(`War Score is currently : ${warScore}`);
}, 30000)


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});