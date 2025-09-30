// ===== DOM Elements =====
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");
const homeBtn = document.querySelector("#home .btn");
const profilePic = document.querySelector("#home img.profile-pic");
const contactForm = document.querySelector("#contact form");
const footerYear = document.getElementById("year");
const dateTimeDisplay = document.getElementById("date-time");
const homeQuote = document.querySelector(".home-quote");

// ===== Function to Show Section =====
function showSection(sectionId) {
  sections.forEach(sec => sec.style.display = "none");
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
    targetSection.scrollIntoView({ behavior:"smooth" });
  }
}

// ===== Navigation Clicks =====
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    showSection(targetId);
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ===== Home Button Click =====
homeBtn.addEventListener("click", e => {
  e.preventDefault();
  showSection("about");
});

// ===== Profile Pic Hover Animation =====
profilePic.addEventListener("mouseenter", () => {
  profilePic.style.transform = "scale(1.1)";
  profilePic.style.boxShadow = "0 0 35px #00c6ff";
});
profilePic.addEventListener("mouseleave", () => {
  profilePic.style.transform = "scale(1)";
  profilePic.style.boxShadow = "0 0 20px rgba(0,198,255,0.5)";
});

// ===== Contact Form Submission =====
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = contactForm.querySelector('input[type="text"]').value;
  const email = contactForm.querySelector('input[type="email"]').value;
  const message = contactForm.querySelector('textarea').value;
  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }
  alert(`Thank you, ${name}! Your message has been sent.`);
  contactForm.reset();
});

// ===== Animate Cards on Scroll =====
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  observer.observe(card);
});

// ===== Show Home by Default =====
showSection("home");

// ===== Dynamic Footer Year =====
footerYear.textContent = new Date().getFullYear();

// ===== Dynamic Date & Time on Home =====
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateString = now.toLocaleDateString(undefined, options);
  dateTimeDisplay.textContent = `${dateString} | ${timeString}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// ===== Random Quotes for Homepage & All Sections =====
const quotes = [
  "Code is like humor. When you have to explain it, it’s bad.",
  "Simplicity is the soul of efficiency.",
  "Stay curious, keep learning.",
  "Design is intelligence made visible.",
  "Strive for progress, not perfection.",
  "Education is the key to unlock your potential.",
  "Projects transform ideas into reality.",
  "Skills are the currency of the future."
];

function updateQuotes() {
  // Homepage
  homeQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  // Other sections
  const quoteBoxes = document.querySelectorAll(".quote-box .quote");
  quoteBoxes.forEach(box => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    box.textContent = randomQuote;
  });
}

// Rotate quotes every 8 seconds
setInterval(updateQuotes, 8000);
updateQuotes();
