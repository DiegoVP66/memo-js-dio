const cards = document.querySelectorAll(".card");
const initBack = document.querySelectorAll(".card-back");
const initFront = document.querySelectorAll(".card-front");
const buttonStart = document.getElementById("start");
const setLife = document.getElementById("life");
let end = document.querySelector(".end");
let hasFlipCard = false;
let firstCard, secondCard;
let lockBoard = false;
let life = 10;
let win = 0;

/* show endGame message */
function endGame() {
  if (win === 8 || life < 1) {
    end.style.display = "unset";
    cards.forEach((card) => {
      card.style.display = "none";
    });
  }
}

/* show cards for 4 seconds to memorize */
function ShowCards() {
  initFront.forEach((card) => {
    card.style.backfaceVisibility = "visible";
    setTimeout(() => {
      card.style.backfaceVisibility = "hidden";
    }, 4000);
  });

  initBack.forEach((card) => {
    card.style.visibility = "hidden";
    setTimeout(() => {
      card.style.visibility = "visible";
    }, 4000);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlipCard) {
    hasFlipCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlipCard = false;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.card === secondCard.dataset.card) {
    win++;
    console.log(win);
    disableCards();
    return;
  } else {
    life--;
    setLife.innerHTML = life;
    console.log(life);
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  if (life < 1) {
    // lose condition
    [hasFlipCard, lockBoard] = [true, true];
    end.style.color = "red";
    end.innerHTML = "Ops... Tente outra vez!";
    endGame();
  }
  if (win == 8) {
    // win condition
    [hasFlipCard, lockBoard] = [true, true];
    end.style.color = "white";
    end.innerHTML = "Parabéns, você ganhou!";
    endGame();
  }
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

/* refresh new game */
function newGame() {
  window.location.reload();
}

buttonStart.addEventListener("click", newGame);
ShowCards();
