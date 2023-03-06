let socket = io();

let minusButton = document.getElementById('decrease-score');
let plusButton = document.getElementById('increase-score');
let warseason = document.getElementById("season");
let warscore = document.getElementById("war-score");

particlesJS.load('particles-js', 'libs/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

socket.on('season', function(season){
    warseason.innerText = `Season ${season}`;
})

socket.on('warscore', function(score){
    warscore.innerText = score;
    document.title = `Integer War - Current Score : ${score}`;

    let gradientScore = score/40 + 85;   
    if(gradientScore < 15)
    {
        gradientScore = 15;
    }
    if(gradientScore > 185)
    {
        gradientScore = 185;
    }
    document.body.style = `background: linear-gradient(to left bottom, var(--main-red), #ac0041, #9a1b72, #6f3f95, var(--main-blue) ${gradientScore}%); background-attachment: fixed;`;
});

minusButton.addEventListener("click", function(){
    socket.emit("updatescore", {
        value: 'sub'
    })
});

plusButton.addEventListener("click", function(){
    socket.emit("updatescore", {
        value: 'add'
    })
})

