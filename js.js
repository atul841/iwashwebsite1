const track = document.getElementById("sliderTrack");
const cards = document.querySelectorAll(".testimonial-card");
const gap = 40;

let index = 1;
let currentX = 0;
let targetX = 0;
let autoSlide;

/* easing (slow motion feel) */
function ease(current, target){
  return current + (target - current) * 0.08; // 👈 smaller = slower
}

function updateTarget(){
  const cardWidth = cards[0].offsetWidth + gap;

  cards.forEach(c => c.classList.remove("active"));
  cards[index].classList.add("active");

  targetX = (index * cardWidth) + (cardWidth / 2);
}

/* smooth animation loop */
function animate(){
  currentX = ease(currentX, targetX);
  track.style.transform =
    `translate3d(calc(50% - ${currentX}px), 0, 0)`;
  requestAnimationFrame(animate);
}

/* controls */
function next(){
  index = (index + 1) % cards.length;
  updateTarget();
}

function prev(){
  index = (index - 1 + cards.length) % cards.length;
  updateTarget();
}

document.getElementById("nextBtn").onclick = () => {
  resetAuto();
  next();
};

document.getElementById("prevBtn").onclick = () => {
  resetAuto();
  prev();
};

/* AUTO SCROLL */
function startAuto(){
  autoSlide = setInterval(next, 4500); // slow interval
}

function resetAuto(){
  clearInterval(autoSlide);
  startAuto();
}

/* INIT */
window.addEventListener("load", () => {
  updateTarget();
  animate();      // 👈 continuous smooth motion
  startAuto();
});


document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 710) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  });
}); 


// FAQ Section ka code yaha se start hota hai  
const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    item.querySelector(".faq-question").addEventListener("click", () => {

      faqItems.forEach(faq => {
        if (faq !== item) {
          faq.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });


  function toggleChat() {
  const chat = document.getElementById("chatPopup");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBody = document.getElementById("chatBody");
  const msg = input.value.trim();

  if (!msg) return;

  // User message
  const userDiv = document.createElement("div");
  userDiv.className = "user-msg";
  userDiv.innerText = msg;
  chatBody.appendChild(userDiv);

  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  // Auto reply
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";

    if (msg.toLowerCase().includes("price")) {
      botDiv.innerText = "💰 Please tell us which service price you want to know?";
    } else if (msg.toLowerCase().includes("website")) {
      botDiv.innerText = "🌐 We build professional websites. Do you want business or e-commerce?";
    } else if (msg.toLowerCase().includes("hello")) {
      botDiv.innerText = "👋 Hello! How can I assist you today?";
    } else {
      botDiv.innerText = "✅ Thank you for your message. Our expert will reply shortly.";
    }

    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 800);
}






