const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    value: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lifeDown: 5,
    },
    action: {
        timerId: setInterval(randomSquare, 1000),
        countdownId: setInterval(countdown, 1000),
    }
};

//surgindo inimigo
function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
};

//pontuação
function addListenerHitBox(){
    state.view.square.forEach((square) => {
        square.addEventListener('mousedown', () =>{
            if(square.id === state.value.hitPosition){
                state.value.result++;
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                playSound();
            } else{
                //diminuir vida
                state.value.lifeDown--;
                state.view.life.textContent = state.value.lifeDown;

                if(state.value.lifeDown == 0){
                    clearInterval(state.action.countdownId);
                    clearInterval(state.action.timerId);
                    alert('Game Over! O seu resultado foi ' + state.value.result);
                }
            }
        });
    });
};

//temporizador
function countdown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;

    if(state.value.currentTime <= 0){
        clearInterval(state.action.countdownId);
        clearInterval(state.action.timerId);
        alert('Game Over! O seu resultado foi ' + state.value.result);
    }
}

//efeito sonoro
function playSound(){
    let audio = new Audio("./assets/yay-6120.mp3");
    audio.volume = 0.3;
    audio.play();
}

//início do jogo
function init(){
    addListenerHitBox();
};

init();