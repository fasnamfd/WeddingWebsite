// ✅ List of section IDs to show/hide manually
const sections = ['#couples', '#info'];

// ✅ Show the given section and scroll to it
function showSection(id) {
  sections.forEach(sec => {
    const el = document.querySelector(sec);
    if (el) {
      el.style.display = 'none';
    }
  });

  const target = document.querySelector(id);
  if (target) {
    target.style.display = 'block';

    // ✅ Smooth scroll to the target
    target.scrollIntoView({ behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const currentNav = document.querySelector(`nav a[href="${id}"]`);
    if (currentNav) currentNav.classList.add('active');
  }
}

// ✅ Nav click handler
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const hash = this.getAttribute('href');
    history.pushState(null, null, hash);
    showSection(hash);
  });
});

// ✅ On page load, show correct section
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash || '#couples';
  showSection(hash);
});

// ✅ Wedding Countdown Timer
const weddingDate = new Date("July 13, 2025 11:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "<h3>We are married 🎉</h3>";
    return;
  }

  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}, 1000);

// ✅ Accordion Toggle
const toggleButtons = document.querySelectorAll('.toggle-btn');
let activeContent = null;
let activeButton = null;

toggleButtons.forEach(button => {
  button.addEventListener('click', function () {
    const target = document.querySelector(this.dataset.target);

    if (activeContent && activeContent !== target) {
      activeContent.style.display = 'none';
      activeButton.classList.remove('active');
    }

    const isVisible = target.style.display === 'block';
    target.style.display = isVisible ? 'none' : 'block';
    this.classList.toggle('active', !isVisible);

    activeContent = !isVisible ? target : null;
    activeButton = !isVisible ? this : null;
  });
});

document.addEventListener('click', function (e) {
  const isAccordionArea = e.target.closest('.accordion');
  if (!isAccordionArea && activeContent) {
    activeContent.style.display = 'none';
    activeButton.classList.remove('active');
    activeContent = null;
    activeButton = null;
  }
});

// ✅ Optional Floating Hearts Animation
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 800);
