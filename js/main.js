const courses = [
  {id:1,title:"Webfejlesztés alapjai",category:"Programozás",level:"Kezdő",duration:"6 óra",description:"Ismerd meg a HTML, CSS és JavaScript világát, és készítsd el első weboldalad.",symbol:"</>",art:"art-code",featured:true},
  {id:2,title:"UI/UX dizájn alapok",category:"Dizájn",level:"Kezdő",duration:"4 óra",description:"Tanulj meg átgondolt, könnyen használható digitális felületeket tervezni.",symbol:"✳",art:"art-design",featured:true},
  {id:3,title:"Adatok és elemzés",category:"Adatok",level:"Középhaladó",duration:"8 óra",description:"Rendszerezd az adatokat, fedezz fel mintákat és hozz jobb döntéseket.",symbol:"▥",art:"art-data",featured:true},
  {id:4,title:"Angol a gyakorlatban",category:"Nyelvek",level:"Kezdő",duration:"5 óra",description:"Fejleszd a mindennapi kommunikációhoz szükséges angoltudásodat.",symbol:"Aa",art:"art-language",featured:false},
  {id:5,title:"Projektmenedzsment",category:"Üzlet",level:"Középhaladó",duration:"7 óra",description:"Tervezd meg a feladatokat, kezeld az időt és dolgozz hatékonyan.",symbol:"↗",art:"art-business",featured:false},
  {id:6,title:"Természettudomány érthetően",category:"Tudomány",level:"Kezdő",duration:"3 óra",description:"Fedezz fel izgalmas tudományos összefüggéseket gyakorlati példákon át.",symbol:"⚛",art:"art-science",featured:false}
];

function courseCard(course) {
  return `<article class="course-card">
    <div class="course-art ${course.art}"><span class="art-symbol">${course.symbol}</span></div>
    <div class="course-content">
      <div class="course-meta"><span class="tag tag-green">${course.category}</span><small>${course.duration}</small></div>
      <h3>${course.title}</h3><p>${course.description}</p>
      <div class="course-bottom"><span>${course.level}</span><a href="lessons/index.html?course=${course.id}">Tanfolyam megnyitása →</a></div>
    </div>
  </article>`;
}

const featuredContainer = document.querySelector("#featuredCourses");
if (featuredContainer) {
  featuredContainer.innerHTML = courses.filter(course => course.featured).map(courseCard).join("");
}

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Navigáció bezárása" : "Navigáció megnyitása");
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Téma beállítása és megjegyzése a böngészőben (LocalStorage).
(function initThemeToggle() {
  const toggle = document.querySelector("#themeToggle");
  const savedTheme = (() => {
    try { return localStorage.getItem("eduplatform-theme"); }
    catch (error) { return null; }
  })();
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (!toggle) return;
    const isDark = theme === "dark";
    toggle.setAttribute("aria-label", isDark ? "Világos mód bekapcsolása" : "Sötét mód bekapcsolása");
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.querySelector(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
    toggle.querySelector(".theme-toggle-label").textContent = isDark ? "Világos mód" : "Sötét mód";
  }

  applyTheme(initialTheme);
  if (toggle) {
    toggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try { localStorage.setItem("eduplatform-theme", nextTheme); }
      catch (error) { console.warn("A téma mentése nem sikerült ebben a böngészőben.", error); }
    });
  }
})();
