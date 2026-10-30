const lessonData=[
{title:"Mi az a HTML?",label:"1. LECKE · ALAPOK",body:'<p>A HTML (HyperText Markup Language) adja a weboldal tartalmának szerkezetét. Segítségével címsorokat, bekezdéseket, képeket és hivatkozásokat helyezhetünk el.</p><pre><code>&lt;h1&gt;Üdvözöllek!&lt;/h1&gt;\n&lt;p&gt;Ez az első weboldalam.&lt;/p&gt;</code></pre><p>A HTML jelölőnyelv. A megjelenést CSS-sel, az interaktív működést pedig JavaScripttel egészítjük ki.</p>'},
{title:"Hogyan működik a CSS?",label:"2. LECKE · MEGJELENÉS",body:'<p>A CSS (Cascading Style Sheets) szabályozza a weboldal megjelenését: a színeket, betűtípusokat, térközöket és elrendezést.</p><pre><code>h1 {\n  color: #176b58;\n  font-size: 2rem;\n}</code></pre><p>A Flexbox és a CSS Grid segít rugalmas, reszponzív elrendezést létrehozni, amely mobilon és asztali gépen is jól használható.</p>'},
{title:"Interaktivitás JavaScripttel",label:"3. LECKE · PROGRAMOZÁS",body:'<p>A JavaScript segítségével reagálhatunk a felhasználói műveletekre, például egy gombnyomásra vagy egy űrlap kitöltésére.</p><pre><code>const gomb = document.querySelector(\"button\");\ngomb.addEventListener(\"click\", () => {\n  alert(\"Szia, tanuló!\");\n});</code></pre><p>A DOM segítségével JavaScriptből elérhetjük és módosíthatjuk a HTML-elemeket. Próbáld ki a kvízt is, hogy ellenőrizd a tudásod!</p>'}
];
const params=new URLSearchParams(location.search);
const selectedCourse=Number(params.get("course")||1);
const course=courses.find(item=>item.id===selectedCourse)||courses[0];
document.querySelector("#lessonTitle").innerHTML=`${course.title.split(" ").slice(0,-1).join(" ")} <span>${course.title.split(" ").slice(-1)[0]}.</span>`;
document.querySelector("#lessonIntro").textContent=course.description;
let activeLesson=0;
let completed=new Set();
try{completed=new Set(JSON.parse(localStorage.getItem(`eduplatform-lessons-${course.id}`)||"[]"));}catch(error){completed=new Set();}
const buttons=[...document.querySelectorAll(".lesson-link")];
function renderLesson(index){
 activeLesson=index;const lesson=lessonData[index];
 document.querySelector("#lessonHeading").textContent=lesson.title;
 document.querySelector("#lessonNumber").textContent=lesson.label;
 document.querySelector("#lessonBody").innerHTML=lesson.body;
 document.querySelector("#lessonFeedback").textContent="";
 buttons.forEach((button,i)=>{button.classList.toggle("active",i===index);button.setAttribute("aria-current",i===index?"step":"false");});
 document.querySelector("#completeLesson").textContent=completed.has(index)?"Lecke teljesítve ✓":"Lecke befejezése ✓";
}
function updateProgress(){
 const count=completed.size;document.querySelector("#lessonProgressText").textContent=`${count} / ${lessonData.length} lecke`;
 document.querySelector("#lessonProgressBar").style.width=`${count/lessonData.length*100}%`;
 try{localStorage.setItem(`eduplatform-lessons-${course.id}`,JSON.stringify([...completed]));}catch(error){console.warn("A haladás mentése nem sikerült.",error);}
}
buttons.forEach((button,index)=>button.addEventListener("click",()=>renderLesson(index)));
document.querySelector("#completeLesson").addEventListener("click",()=>{
 if(completed.has(activeLesson)){document.querySelector("#lessonFeedback").textContent="Ezt a leckét már teljesítetted.";return;}
 completed.add(activeLesson);updateProgress();renderLesson(activeLesson);
 document.querySelector("#lessonFeedback").textContent="Szép munka! A haladásod elmentettük ezen az eszközön.";
});
updateProgress();renderLesson(0);
