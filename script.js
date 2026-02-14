const openMessageBtn = document.getElementById("openMessage");
const noBtn = document.getElementById("noBtn");
const choiceArea = document.getElementById("choiceArea");
const messageSection = document.getElementById("messageSection");
const memorySection = document.getElementById("memorySection");
const typedLines = document.getElementById("typedLines");
const heartsRoot = document.getElementById("floating-hearts");
const yesSong = document.getElementById("yesSong");
const noSong = document.getElementById("noSong");
const memoryCards = document.querySelectorAll(".memory-stagger");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxBtn = document.getElementById("closeLightbox");

const messageLines = [
  "You are my calm in chaos and my joy in every ordinary day.",
  "Thank you for being my partner, my best friend, and my home.",
  "I promise to keep choosing you, loving you, and celebrating you.",
  "Happy Valentine's Day, Pranavati."
];

let started = false;

openMessageBtn.addEventListener("click", async () => {
  if (started) return;
  started = true;
  playYesSong();
  launchLoveExplosion();

  messageSection.classList.remove("hidden");
  messageSection.classList.add("fade-in");

  for (const line of messageLines) {
    await wait(550);
    typeLine(line);
  }

  revealReasonCards();

  setTimeout(() => {
    memorySection.classList.remove("hidden");
    memorySection.classList.add("fade-in");
    revealMemoryCards();
  }, 500);
});

if (noBtn && choiceArea) {
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("focus", moveNoButton);
  if (window.PointerEvent) {
    noBtn.addEventListener("pointerdown", handleNoAttempt);
  } else {
    noBtn.addEventListener("touchstart", handleNoAttempt, { passive: false });
  }
  noBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleNoAttempt(event);
    }
  });
}

memoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const caption = card.getAttribute("data-caption") || "";

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove("hidden");
  });
});

closeLightboxBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
  lightboxCaption.textContent = "";
}

function moveNoButton(event) {
  if (event) event.preventDefault();
  if (!noBtn || !choiceArea) return;

  const areaRect = choiceArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 8;
  const minX = padding + btnRect.width / 2;
  const maxX = areaRect.width - padding - btnRect.width / 2;
  const minY = padding + btnRect.height / 2;
  const maxY = areaRect.height - padding - btnRect.height / 2;

  let nextX = randomBetween(minX, maxX);
  let nextY = randomBetween(minY, maxY);
  const yesX = areaRect.width * 0.25;
  const yesY = areaRect.height * 0.5;
  let retries = 0;

  while (Math.hypot(nextX - yesX, nextY - yesY) < btnRect.width && retries < 12) {
    nextX = randomBetween(minX, maxX);
    nextY = randomBetween(minY, maxY);
    retries += 1;
  }

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;
}

function handleNoAttempt(event) {
  playNoSong();
  moveNoButton(event);
}

function typeLine(text) {
  const p = document.createElement("p");
  p.className = "typed-line";
  p.textContent = text;
  typedLines.appendChild(p);
}

function revealReasonCards() {
  const cards = document.querySelectorAll(".stagger");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, 220 * index);
  });
}

function revealMemoryCards() {
  memoryCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, 230 * index);
  });
}

function playYesSong() {
  if (!yesSong) return;
  if (noSong) {
    noSong.pause();
    noSong.currentTime = 0;
  }
  playSong(yesSong);
}

function playNoSong() {
  if (!noSong) return;
  if (yesSong) {
    yesSong.pause();
  }
  noSong.currentTime = 0;
  playSong(noSong);
}

function playSong(audio) {
  const maybePromise = audio.play();
  if (maybePromise && typeof maybePromise.catch === "function") {
    maybePromise.catch(() => {});
  }
}

function launchLoveExplosion() {
  for (let i = 0; i < 44; i += 1) {
    setTimeout(() => {
      spawnHeart({ burst: true, xRange: [26, 74], bottom: "20vh" });
    }, i * 24);
  }

  for (let i = 0; i < 34; i += 1) {
    setTimeout(() => {
      spawnHeart({ burst: true, xRange: [6, 94], bottom: "8vh" });
    }, 220 + i * 32);
  }
}

function spawnHeart({ burst = false, xRange = null, bottom = null } = {}) {
  const heart = document.createElement("span");
  heart.className = "heart";

  const x = xRange ? randomBetween(xRange[0], xRange[1]) : burst ? 35 + Math.random() * 30 : Math.random() * 100;
  const life = burst ? 2200 + Math.random() * 800 : 4200 + Math.random() * 2600;
  const size = burst ? 10 + Math.random() * 12 : 8 + Math.random() * 10;

  heart.style.left = `${x}vw`;
  heart.style.bottom = bottom || (burst ? "26vh" : "-24px");
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.animationDuration = `${life}ms`;
  heart.style.opacity = `${0.5 + Math.random() * 0.4}`;

  heartsRoot.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, life + 120);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  if (max <= min) return min;
  return Math.random() * (max - min) + min;
}

setInterval(() => spawnHeart(), 360);
