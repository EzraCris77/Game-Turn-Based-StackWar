let hpP1 = 100;
let hpP2 = 100;
let stackP1 = [];
let stackP2 = [];
let giliran = "P1";
let buffs = {
    P1: null,
    P2: null
  };
  
  let turnCounter = 0;

const soundAttack = document.getElementById("soundAttack");
const soundDefend = document.getElementById("soundDefend");

function updateUI() {
  document.getElementById("hpP1").innerText = hpP1;
  document.getElementById("hpP2").innerText = hpP2;
  document.getElementById("turnInfo").innerText = giliran === "P1" ? "Pemain 1" : "Pemain 2 (AI)";

  const stack1 = document.getElementById("stackP1");
  const stack2 = document.getElementById("stackP2");
  stack1.innerHTML = "";
  stack2.innerHTML = "";

  stackP1.forEach(symbol => {
    const el = document.createElement("div");
    el.textContent = symbol;
    stack1.appendChild(el);
  });

  stackP2.forEach(symbol => {
    const el = document.createElement("div");
    el.textContent = symbol;
    stack2.appendChild(el);
  });

  document.getElementById("controlsP1").style.display = giliran === "P1" ? "block" : "none";
}

function serang(player) {
  if (giliran !== player) return;

  soundAttack.play();

  if (player === "P1") {
    stackP1.push("A");
    hpP2 -= 10;
    log("Pemain 1 menyerang → PUSH('A')");
    trace("δ(q, a, Z) → (q, AZ)");
  } else {
    stackP2.push("A");
    hpP1 -= 10;
    log("AI menyerang → PUSH('A')");
    trace("δ(q, a, Z) → (q, AZ)");
  }

  nextTurn();
}

function bertahan(playerId) {
  if (giliran !== player) r;

  let stack = player === "P1" ? stackP1 : stackP2;
  if (stack.length > 0) {
    stack.pop(); 
    soundDefend.play();
    if (player === "P1") {
      hpP1 += 5;
      log("Pemain 1 bertahan → POP");
      trace("δ(q, a, A) → (q, ε)");
    } else {
      hpP2 += 5;
      log("AI bertahan → POP");
      trace("δ(q, a, A) → (q, ε)");
    }
  } else {
    log("Stack kosong, tidak bisa bertahan.");
  }

  nextTurn();
}

function nextTurn() {
  if (hpP1 <= 0 || hpP2 <= 0) {
    const winner = hpP1 <= 0 ? "Pemain 2 (AI)" : "Pemain 1";
    log(`${winner} menang!`);
    document.getElementById("controlsP1").style.display = "none";
    return;
  }

  giliran = giliran === "P1" ? "P2" : "P1";
  updateUI();

  if (giliran === "P2") {
    setTimeout(() => {
      const decision = Math.random() < 0.5 ? "serang" : "bertahan";
      if (decision === "serang") serang("P2");
      else bertahan("P2");
    }, 1200); // Delay AI
  }
}

function getRandomBuff() {
    const buffList = ['Stack Shield', 'Double Push', 'HP Regen', 'Critical Hit', 'Stack Purge'];
    return buffList[Math.floor(Math.random() * buffList.length)];
  }
  
  function assignBuff(playerId) {
    const buff = getRandomBuff();
    buffs[playerId] = buff;
    document.getElementById(`buff${playerId}`).innerText = buff;
    log(`${playerId} mendapatkan buff: ${buff}`);
  }

function log(text) {
  document.getElementById("log").innerText = text;
}

function trace(text) {
  const el = document.createElement("div");
  el.textContent = text;
  document.getElementById("trace").appendChild(el);
}

updateUI();

function updateUI() {
    document.getElementById("hpP1").innerText = hpP1;
    document.getElementById("hpP2").innerText = hpP2;
  
    document.getElementById("barP1").style.width = hpP1 + "%";
    document.getElementById("barP1").innerText = hpP1 + "%";
  
    document.getElementById("barP2").style.width = hpP2 + "%";
    document.getElementById("barP2").innerText = hpP2 + "%";
  
    document.getElementById("turnInfo").innerText = giliran === "P1" ? "Pemain 1" : "Pemain 2 (AI)";
  
    const stack1 = document.getElementById("stackP1");
    const stack2 = document.getElementById("stackP2");
  
    stack1.classList.toggle("full", stackP1.length >= 10);
    stack2.classList.toggle("full", stackP2.length >= 10);
  
    stack1.innerHTML = "";
    stack2.innerHTML = "";
  
    stackP1.forEach(symbol => {
      const el = document.createElement("div");
      el.textContent = symbol;
      stack1.appendChild(el);
    });
  
    stackP2.forEach(symbol => {
      const el = document.createElement("div");
      el.textContent = symbol;
      stack2.appendChild(el);
    });
  
    document.getElementById("controlsP1").style.display = giliran === "P1" ? "block" : "none";
  }
  
  function checkWinCondition() {
    if (player1.hp <= 0) {
      player1.hp = 0;
      updateHPDisplay();
      gameMessage.innerHTML = "<em>Pemain 2 (AI) menang!</em>";
      isGameOver = true;
    } else if (player2.hp <= 0) {
      player2.hp = 0;
      updateHPDisplay();
      gameMessage.innerHTML = "<em>Pemain 1 menang!</em>";
      isGameOver = true;
    }
  }

  function updateHPDisplay() {
    // Clamp HP between 0 and 100
    player1.hp = Math.max(player1.hp, 0);
    player2.hp = Math.max(player2.hp, 0);
  
    player1HP.textContent = "HP: " + player1.hp;
    player2HP.textContent = "HP: " + player2.hp;
  
    player1Bar.style.width = player1.hp + "%";
    player2Bar.style.width = player2.hp + "%";
  }
  