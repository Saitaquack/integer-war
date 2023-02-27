let socket = io();

let minusButton = document.getElementById('decrease-score');
let plusButton = document.getElementById('increase-score');

socket.on('warscore', function(score){
    let warscore = document.getElementById("war-score");
    warscore.innerText = score;

    let gradientScore = -score/20 + 100;
    document.body.style = "background: linear-gradient(90deg, var(--main-blue), var(--main-red) "+gradientScore+"%);"
});

minusButton.addEventListener("click", function(){
    socket.emit("updatescore", {
        sign: 'minus'
    })
});

plusButton.addEventListener("click", function(){
    socket.emit("updatescore", {
        sign: 'plus'
    })
})

