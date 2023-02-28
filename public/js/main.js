let socket = io();

let minusButton = document.getElementById('decrease-score');
let plusButton = document.getElementById('increase-score');

socket.on('season', function(season){
    let warseason = document.getElementById("season");
    warseason.innerText = "Season "+season+"";
})
socket.on('warscore', function(score){
    let warscore = document.getElementById("war-score");
    warscore.innerText = score;

    let gradientScore = -score/20 + 100;
    
    if(gradientScore < 30)
    {
        gradientScore = 30;
    }
    if(gradientScore > 170)
    {
        gradientScore = 170;
    }
    document.body.style = "background: linear-gradient(90deg, var(--main-blue), var(--main-red) "+gradientScore+"%);"
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

