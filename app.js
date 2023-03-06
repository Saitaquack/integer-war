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

    io.emit('warscore', warScore);
    io.emit('season', warSeason);
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
                    console.log("User sent invalid score update. They probably used the JS Console.");
            }
        }
        else
        {
            console.log("User sent invalid data for score update. They probably used the JS Console.");
        }     
    });
});

/* Code to save War Score if crash occures every 30 seconds */

setInterval(() => {
    console.log(`War Score is currently : ${warScore}`);
}, 30000)


const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log(`Server up on port ${port}`);
});