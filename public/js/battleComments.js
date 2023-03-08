let battleComment = document.getElementById("battle-commentary");

function updateBattleComment(message)
{
    battleComment.innerText = message;
}

socket.on('warscore', function(score) {

    if(score > 0)
    {
        if(score >= 50000)
        {
            updateBattleComment('RIP negatives 💀');
        }
        else if(score >= 25000)
        {
            updateBattleComment('Positive gang HYPE !!');
        }
        else if(score >= 10000)
        {
            updateBattleComment('Positives are dominating negatives !');
        }
        else if(score >= 2500)
        {
            updateBattleComment('Negative Gang, what are you guys doing ?!');
        }
        else if(score >= 1000)
        {
            updateBattleComment('Positives are getting far, better watch out !');
        }
        else if(score >= 250)
        {
            updateBattleComment('Positives are keeping the lead !');
        }
        else if(score >= 1)
        {
            updateBattleComment('Seems like positives took the lead !');
        }
    }
    else if(score == 0)
    {
        updateBattleComment('Perfect balance, as everything should be.');
    }
    else
    {
        if(score <= -50000)
        {
            updateBattleComment('RIP positives 💀');
        }
        else if(score <= -25000)
        {
            updateBattleComment('Negative gang HYPE !!');
        }
        else if(score <= -10000)
        {
            updateBattleComment('Negatives are dominating positives !');
        }
        else if(score <= -2500)
        {
            updateBattleComment('Positive Gang, what are you guys doing ?!');
        }
        else if(score <= -1000)
        {
            updateBattleComment('Negatives are getting far, better watch out !');
        }
        else if(score <= -250)
        {
            updateBattleComment('Negatives are keeping the lead !');
        }
        else if(score <= -1)
        {
            updateBattleComment('Seems like negatives took the lead !');
        }
    }   
});



