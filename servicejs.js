// Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.faq-group').forEach(g => g.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const group = item.parentElement;

      group.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) i.classList.remove('open');
      });

      item.classList.toggle('open');
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


window.addEventListener("load", () => {
  const loader = document.querySelector(".service-loader");
  const grid = document.querySelector(".services-grid");

  setTimeout(() => {
    loader.classList.add("hide");   // ball hide
    grid.classList.add("show");     // services show
  }, 2000); // 👈 2 seconds
});

