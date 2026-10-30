const catalog = document.querySelector("#courseCatalog");
const searchInput = document.querySelector("#courseSearch");
const categoryFilter = document.querySelector("#categoryFilter");
const levelFilter = document.querySelector("#levelFilter");
const resultsLine = document.querySelector("#resultsLine");

function renderCatalog() {
  const query = searchInput.value.trim().toLocaleLowerCase("hu");
  const category = categoryFilter.value;
  const level = levelFilter.value;
  const filtered = courses.filter(course => {
    const matchesText = `${course.title} ${course.description} ${course.category}`.toLocaleLowerCase("hu").includes(query);
    return matchesText && (category === "all" || course.category === category) && (level === "all" || course.level === level);
  });
  catalog.innerHTML = filtered.length ? filtered.map(courseCard).join("") : '<div class="empty-state"><strong>Nem találtunk ilyen tanfolyamot.</strong><br>Próbálj más keresőkifejezést vagy szűrőt!</div>';
  resultsLine.textContent = `${filtered.length} tanfolyam található`;
}
[searchInput, categoryFilter, levelFilter].forEach(control => control.addEventListener("input", renderCatalog));
renderCatalog();
