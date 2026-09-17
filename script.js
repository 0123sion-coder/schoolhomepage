/* =========================================
   부산기계공업고등학교 신입생 안내 - 스크립트
   ========================================= */

// ===== 모바일 햄버거 메뉴 =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// 메뉴 클릭 시 모바일 메뉴 닫기
navMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});

// ===== 스크롤 시 내비게이션 그림자 + 맨 위로 버튼 =====
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 10);
  toTop.classList.toggle("show", y > 500);
  highlightNav();
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== 스크롤 스파이 (현재 섹션 메뉴 강조) =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightNav() {
  const scrollPos = window.scrollY + 120;
  let currentId = "";
  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop) currentId = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

// ===== 스크롤 등장 애니메이션 (reveal) =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== 통계 숫자 카운트업 =====
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ===== 입학식 카운트다운 =====
// 다가오는 3월 2일(입학식)을 자동으로 계산
function nextEntranceCeremony() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 2, 2, 9, 0, 0); // 3월 2일 09:00
  if (now > target) {
    target = new Date(year + 1, 2, 2, 9, 0, 0);
  }
  return target;
}

const ceremonyDate = nextEntranceCeremony();
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMin = document.getElementById("cdMin");
const cdSec = document.getElementById("cdSec");

function pad(n) {
  return String(n).padStart(2, "0");
}

function updateCountdown() {
  const diff = ceremonyDate - new Date();
  if (diff <= 0) {
    cdDays.textContent = "D-Day";
    cdHours.textContent = "🎉";
    cdMin.textContent = "🎉";
    cdSec.textContent = "🎉";
    return;
  }
  const s = Math.floor(diff / 1000);
  cdDays.textContent = Math.floor(s / 86400);
  cdHours.textContent = pad(Math.floor((s % 86400) / 3600));
  cdMin.textContent = pad(Math.floor((s % 3600) / 60));
  cdSec.textContent = pad(s % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== 신입생 가이드 탭 =====
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
