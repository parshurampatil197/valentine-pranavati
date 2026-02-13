const openMessageBtn = document.getElementById("openMessage");
const heartBurstBtn = document.getElementById("heartBurst");
const messageSection = document.getElementById("messageSection");
const memorySection = document.getElementById("memorySection");
const typedLines = document.getElementById("typedLines");
const heartsRoot = document.getElementById("floating-hearts");
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

heartBurstBtn.addEventListener("click", () => {
  for (let i = 0; i < 14; i += 1) {
    spawnHeart({ burst: true });
  }
});

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

function spawnHeart({ burst = false } = {}) {
  const heart = document.createElement("span");
  heart.className = "heart";

  const x = burst ? 35 + Math.random() * 30 : Math.random() * 100;
  const life = burst ? 2200 + Math.random() * 800 : 4200 + Math.random() * 2600;
  const size = burst ? 10 + Math.random() * 12 : 8 + Math.random() * 10;

  heart.style.left = `${x}vw`;
  heart.style.bottom = burst ? "26vh" : "-24px";
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

setInterval(() => spawnHeart(), 360);
