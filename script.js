let hpP1 = 100;
let hpP2 = 100;
let stackP1 = [];
let stackP2 = [];
let giliran = "P1";
let turnCounter = 0;
let isGameOver = false;
let buffs = {
  P1: null,
  P2: null
};

const soundAttack = document.getElementById("soundAttack");
const soundDefend = document.getElementById("soundDefend");

function getRandomBuff() {
  const buffList = ['Stack Shield', 'Double Push', 'HP Regen', 'Critical Hit', 'Stack Purge'];
  return buffList[Math.floor(Math.random() * buffList.length)];
}

function assignBuff(playerId) {
  const buff = getRandomBuff();
  buffs[playerId] = buff;

  const buffElement = document.getElementById(`buff${playerId}`);

  // Reset class dan isi
  buffElement.className = 'buff';
  let icon = '';
  let tooltip = '';

  switch (buff) {
    case 'Stack Shield':
      icon = '🛡️';
      tooltip = 'Menahan 1 serangan musuh sepenuhnya. (Menyerang)';
      buffElement.classList.add('buff-stack-shield');
      break;
    case 'Double Push':
      icon = '🌀';
      tooltip = 'Saat menyerang, pemain menambahkan 2 simbol ke stack-nya sendiri. (Menyerang)';
      buffElement.classList.add('buff-double-push');
      break;
    case 'HP Regen':
      icon = '💚';
      tooltip = 'Regenerasi 10 HP setiap giliran. (Bertahan/Menyerang)';
      buffElement.classList.add('buff-hp-regen');
      break;
    case 'Critical Hit':
      icon = '💥';
      tooltip = 'Serangan berikutnya memberikan 30 damage. (Menyerang)';
      buffElement.classList.add('buff-critical-hit');
      break;
    case 'Stack Purge':
      icon = '🔄';
      tooltip = 'Menghapus semua simbol di stack lawan ketika bertahan. (Bertahan)';
      buffElement.classList.add('buff-stack-purge');
      break;
  }

  buffElement.innerText = `${icon} ${buff}`;
  buffElement.setAttribute('title', tooltip);
  log(`${playerId} mendapatkan buff: ${buff}`);
}
  buffElement.className = 'buff';

  switch (buff) {
    case 'Stack Shield':
      buffElement.classList.add('buff-stack-shield');
      break;
    case 'Double Push':
      buffElement.classList.add('buff-double-push');
      break;
    case 'HP Regen':
      buffElement.classList.add('buff-hp-regen');
      break;
    case 'Critical Hit':
      buffElement.classList.add('buff-critical-hit');
      break;
    case 'Stack Purge':
      buffElement.classList.add('buff-stack-purge');
      break;
  }

  log(`${playerId} mendapatkan buff: ${buff}`);


function serang(player) {
  if (giliran !== player) return;
  soundAttack.play();

  const isPlayer1 = player === "P1";
  const attackerStack = isPlayer1 ? stackP1 : stackP2;
  const targetStack = isPlayer1 ? stackP2 : stackP1;
  let damage = 10;
  const targetId = isPlayer1 ? "P2" : "P1";

  attackerStack.push("A");
  log(`${isPlayer1 ? "Pemain 1" : "AI"} menyerang → PUSH('A')`);
  trace("δ(q, a, Z) → (q, AZ)");

  if (attackerStack.length >= 10) {
  damage = 20;
  log(`${player} memiliki stack penuh! Serangan memberikan 20 damage!`);
  
  const stackEl = document.getElementById(`stack${player}`);
  stackEl.classList.add('stack-flash');

  setTimeout(() => {
    attackerStack.length = 0;
    updateUI();
    stackEl.classList.remove('stack-flash');
    log(`${player} menggunakan efek serangan stack penuh! Stack di-reset.`);
  }, 500);
}

  if (buffs[player] === 'Double Push') {
    attackerStack.push("A");
    attackerStack.push("A");
    log(`${player} menggunakan buff Double Push!`);
    log(`Efek: Stack sendiri bertambah 2 simbol`);
  }

  if (buffs[player] === 'Critical Hit') {
    damage = 30;
    log(`${player} melakukan Critical Hit!`);
    log(`Efek: Serangan berikutnya memberikan 30 damage.`);
    buffs[player] = null;
    document.getElementById(`buff${player}`).innerText = '-';
  }

  if (buffs[targetId] === 'Stack Shield') {
    log(`${targetId} menahan serangan dengan Stack Shield!`);
    log(`Efek: Serangan sepenuhnya diblokir.`);
    buffs[targetId] = null;
    document.getElementById(`buff${targetId}`).innerText = '-';
  } else {
    if (isPlayer1) {
  hpP2 = Math.max(0, hpP2 - damage);
} else {
  hpP1 = Math.max(0, hpP1 - damage);
}
  }

  nextTurn();
}

function bertahan(player) {
  if (giliran !== player) return;
  const isPlayer1 = player === "P1";
  let stack = isPlayer1 ? stackP1 : stackP2;

  if (stack.length > 0) {
    stack.pop();
    soundDefend.play();
    if (isPlayer1) {
      hpP1 = Math.min(hpP1 + 5, 100);
      log("Pemain 1 bertahan → POP");
      trace("δ(q, a, A) → (q, ε)");
    } else {
      hpP2 = Math.min(hpP2 + 5, 100);
      log("AI bertahan → POP");
      trace("δ(q, a, A) → (q, ε)");
    }
  } else {
    log("Stack kosong, tidak bisa bertahan.");
  }

  if (buffs[player] === 'Stack Purge') {
    if (isPlayer1) stackP2 = [];
    else stackP1 = [];
    log(`${player} menggunakan Stack Purge!`);
    buffs[player] = null;
    document.getElementById(`buff${player}`).innerText = '-';
  }

  nextTurn();
}

function nextTurn() {
  if (hpP1 <= 0 || hpP2 <= 0) {
  const winner = hpP1 <= 0 ? "Pemain 2 (AI)" : "Pemain 1";
  log(`${winner} menang!`);

  isGameOver = true;

  document.getElementById("controlsP1").style.display = "none";

  document.getElementById("winnerMessage").innerText = `⭐ ${winner} MENANG!`;
  document.getElementById("gameOver").classList.remove("hidden");

  updateUI();
  return;
}

  // Pemulihan dengan buff HP Regen
  if (buffs["P1"] === 'HP Regen') {
    hpP1 = Math.min(hpP1 + 10, 100);
    log("P1 mendapatkan Regen 10 HP!");
  }
  if (buffs["P2"] === 'HP Regen') {
    hpP2 = Math.min(hpP2 + 10, 100);
    log("P2 mendapatkan Regen 10 HP!");
  }

  turnCounter++;
  if (turnCounter % 3 === 0) {
    assignBuff("P1");
    assignBuff("P2");
  }

  giliran = giliran === "P1" ? "P2" : "P1";
  updateUI();

  if (giliran === "P2") {
    setTimeout(() => {
      const decision = Math.random() < 0.5 ? "serang" : "bertahan";
      if (decision === "serang") serang("P2");
      else bertahan("P2");
    }, 1200);
  }
}

function log(text) {
  document.getElementById("log").innerText = text;
}

function trace(text) {
  const el = document.createElement("div");
  el.textContent = text;
  document.getElementById("trace").appendChild(el);
}

function updateUI() {
  document.getElementById("hpP1").innerText = hpP1;
  document.getElementById("hpP2").innerText = hpP2;

  document.getElementById("barP1").style.width = Math.max(0, hpP1) + "%";
  document.getElementById("barP1").innerText = Math.max(0, hpP1) + "%";

  document.getElementById("barP2").style.width = Math.max(0, hpP2) + "%";
  document.getElementById("barP2").innerText = Math.max(0, hpP2) + "%";

  document.getElementById("turnInfo").innerText = giliran === "P1" ? "Pemain 1" : "Pemain 2 (AI)";

  const stack1 = document.getElementById("stackP1");
  const stack2 = document.getElementById("stackP2");

  stack1.classList.toggle("full", stackP1.length >= 10);
  stack2.classList.toggle("full", stackP2.length >= 10);

if (stackP1.length >= 7 && stackP1.length < 10) {
  stack1.style.border = "2px solid orange";
} else {
  stack1.style.border = "";
}

if (stackP2.length >= 7 && stackP2.length < 10) {
  stack2.style.border = "2px solid orange";
} else {
  stack2.style.border = "";
}

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

  document.getElementById("controlsP1").style.display =
  giliran === "P1" && !isGameOver ? "block" : "none";

}

updateUI();

function restartGame() {
  hpP1 = 100;
  hpP2 = 100;
  stackP1 = [];
  stackP2 = [];
  giliran = "P1";
  buffs = { P1: null, P2: null };
  turnCounter = 0;
  isGameOver = false;

  document.getElementById("log").innerHTML = "";
  document.getElementById("trace").innerHTML = "";
  document.getElementById("buffP1").innerText = "-";
  document.getElementById("buffP2").innerText = "-";

  document.getElementById("buffP1").className = "buff";
  document.getElementById("buffP2").className = "buff";

  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("controlsP1").style.display = "block";

  updateUI();
}