const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();
    const headerOffset = document.querySelector(".site-header").offsetHeight + 16;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

const courses = [
  {
    label: "קורס יסוד",
    title: "מבני נתונים",
    description:
      "לומדים איך מידע מאורגן מאחורי הקלעים של מערכות מהירות: עצים, תורים, טבלאות גיבוב וחשיבה אלגוריתמית שמלווה כל מהנדס תוכנה.",
    points: ["בחירת מבנה נתונים לפי בעיה אמיתית", "ניתוח יעילות וזמני ריצה", "בסיס חזק לקורסי תוכנה מתקדמים"],
  },
  {
    label: "דאטה ובינה מלאכותית",
    title: "למידת מכונה",
    description:
      "מתנסים במודלים שמזהים דפוסים בנתונים, מנבאים תוצאות ומייצרים תובנות שימושיות למוצרים, ארגונים ומחקר.",
    points: ["סיווג, רגרסיה ואימון מודלים", "הערכת איכות ודיוק", "חיבור בין אלגוריתמים לשאלות עסקיות"],
  },
  {
    label: "חשיבה מערכתית",
    title: "ניתוח מערכות מידע",
    description:
      "מפרקים בעיה ארגונית לצרכים, תהליכים, משתמשים וממשקים, ואז מתרגמים אותה לאפיון ברור של מערכת.",
    points: ["איסוף דרישות מבעלי עניין", "מודלים של תהליכים ונתונים", "תכנון פתרון שמשרת משתמשים אמיתיים"],
  },
  {
    label: "אופטימיזציה",
    title: "חקר ביצועים",
    description:
      "לומדים לקבל החלטות מיטביות תחת אילוצים: תכנון משאבים, תורים, רשתות ובעיות הקצאה בעולם מורכב.",
    points: ["בניית מודלים מתמטיים", "שיפור תהליכים ותפעול", "פתרון בעיות בקנה מידה גדול"],
  },
];

const courseLabel = document.querySelector("#course-label");
const courseTitle = document.querySelector("#course-title");
const courseDescription = document.querySelector("#course-description");
const coursePoints = document.querySelector("#course-points");

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    const course = courses[Number(button.dataset.course)];

    document.querySelectorAll(".tab-button").forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    courseLabel.textContent = course.label;
    courseTitle.textContent = course.title;
    courseDescription.textContent = course.description;
    coursePoints.innerHTML = course.points.map((point) => `<li>${point}</li>`).join("");
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      faq.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const track = document.querySelector(".testimonial-track");
const slides = [...document.querySelectorAll(".testimonial-card")];
const dotsContainer = document.querySelector(".carousel-dots");
let currentSlide = 0;

function renderDots() {
  dotsContainer.innerHTML = slides
    .map((_, index) => `<button type="button" aria-label="מעבר לעדות ${index + 1}"></button>`)
    .join("");
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  dotsContainer.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

renderDots();
updateCarousel();

document.querySelector(".next").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

dotsContainer.querySelectorAll("button").forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index;
    updateCarousel();
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
