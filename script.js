let items = document.querySelectorAll(".item");
let joueur = document.getElementById("joueur");
let commencer = document.getElementById("start");
let morpion = document.getElementById("morpion");
let n = 1;
let tabJ1 = [];
let tabJ2 = [];
let pasfini;
nj1 = 0;
nj2 = 0;
countj1 = document.getElementById("j1count");
countj2 = document.getElementById("j2count");

function testWin(a) {
  if (
    (a.includes(0) && a.includes(1) && a.includes(2)) ||
    (a.includes(3) && a.includes(4) && a.includes(5)) ||
    (a.includes(6) && a.includes(7) && a.includes(8)) ||
    (a.includes(0) && a.includes(3) && a.includes(6)) ||
    (a.includes(1) && a.includes(4) && a.includes(7)) ||
    (a.includes(2) && a.includes(5) && a.includes(8)) ||
    (a.includes(0) && a.includes(4) && a.includes(8)) ||
    (a.includes(2) && a.includes(4) && a.includes(6))
  ) {
    return true;
  }
}
function colorier(x, y, z) {
  morpion.children[x].style.backgroundColor = "green";
  morpion.children[y].style.backgroundColor = "green";
  morpion.children[z].style.backgroundColor = "green";
}
function colorierGagnant(a) {
  if (a.includes(0) && a.includes(1) && a.includes(2)) {
    colorier(0, 1, 2);
  } else if (a.includes(3) && a.includes(4) && a.includes(5)) {
    colorier(3, 4, 5);
  } else if (a.includes(6) && a.includes(7) && a.includes(8)) {
    colorier(6, 7, 8);
  } else if (a.includes(0) && a.includes(3) && a.includes(6)) {
    colorier(0, 3, 6);
  } else if (a.includes(1) && a.includes(4) && a.includes(7)) {
    colorier(1, 4, 7);
  } else if (a.includes(2) && a.includes(5) && a.includes(8)) {
    colorier(2, 5, 8);
  } else if (a.includes(0) && a.includes(4) && a.includes(8)) {
    colorier(0, 4, 8);
  } else if (a.includes(2) && a.includes(4) && a.includes(6)) {
    colorier(2, 4, 6);
  }
}

function testEgal() {
  let ticked = document.querySelectorAll(".ticked");
  if (ticked.length == 9) {
    return true;
  }
}

function changerJoueur() {
  if (n === 1) {
    joueur.innerText = "Joueur 2 à toi";
    joueur.style.backgroundColor = "red";
    n = 2;
  } else {
    joueur.innerText = "Joueur 1 à toi";
    joueur.style.backgroundColor = "rgb(25, 105, 255)";
    n = 1;
  }
}
function InsererImage(x) {
  let img = document.createElement("img");
  console.log("oui");
  if (n === 1) {
    img.src = "./croix.png";
    x.append(img);
  } else {
    img.src = "./rond.png";
    x.append(img);
  }
}
function tickedAll() {
  for (let i = 0; i < 9; i++) {
    morpion.children[i].className = "ticked";
  }
}
function recommencer() {
  commencer.className = "recommence";
}

function commencerJeu() {
  joueur.innerText = "Joueur 1 à toi";
  joueur.style.backgroundColor = "rgb(25, 105, 255)";
  for (let i = 0; i < 9; i++) {
    morpion.children[i].addEventListener("click", function () {
      if (morpion.children[i].className == "ticked") {
        console.log("case déjà coché");
      } else {
        if (n === 1) {
          tabJ1.push(i);
          console.log(tabJ1);
        } else {
          tabJ2.push(i);
          console.log(tabJ2);
        }
        InsererImage(morpion.children[i]);
        morpion.children[i].className = "ticked";
        pasfini = true;
        if (testWin(tabJ1)) {
          tickedAll();
          commencer.innerText = "Recommencer";
          joueur.innerText = "Joueur 1 a gagné !";
          colorierGagnant(tabJ1);
          joueur.style.backgroundColor = "green";
          pasfini = false;
          recommencer();
          nj1 += 1;
          countj1.innerText = "J1 : " + nj1;
        } else if (testWin(tabJ2)) {
          tickedAll();
          commencer.innerText = "Recommencer";
          joueur.innerText = "Joueur 2 a gagné !";
          colorierGagnant(tabJ2);
          joueur.style.backgroundColor = "green";
          pasfini = false;
          recommencer();
          nj2 += 1;
          countj2.innerText = "J2 : " + nj2;
        } else if (testEgal()) {
          alert("Egalité !");
          commencer.innerText = "Recommencer";
          joueur.innerText = " Egalité !";
          joueur.style.backgroundColor = "grey";
          pasfini = false;
          recommencer();
        }
        if (pasfini) {
          changerJoueur();
        }
      }
    });
  }
}

commencer.addEventListener("click", function () {
  if (commencer.className !== "encours") {
    if (commencer.className == "recommence") {
      morpion.innerHTML = `<div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>`;
      tabJ1 = [];
      tabJ2 = [];
      n = 1;
    }
    commencer.className = "encours";
    commencerJeu();
    commencer.innerText = "Jeu en cours";
  }
});
