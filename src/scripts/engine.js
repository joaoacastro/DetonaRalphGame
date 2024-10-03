const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
  },
  actions: {
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.05;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime === 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    
    playSound("gameover");
    setTimeout(() => {
      alert("GAME OVER! O seu resultado foi: " + state.values.result);
    }, 500);// Meio segundo de atraso para garantir que o som toque antes
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  //função iniciar
  moveEnemy();
  addListenerHitbox();
}

initialize();
