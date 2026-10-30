const questions = [
  {question:"Melyik nyelv felelős elsősorban egy weboldal szerkezetéért?",answers:["CSS","HTML","JavaScript","SQL"],correct:1,explanation:"A HTML írja le a tartalom szerkezetét és jelentését."},
  {question:"Mire használjuk elsősorban a CSS-t?",answers:["Adatbázis létrehozására","Szerver indítására","A weboldal megjelenésének formázására","E-mail küldésére"],correct:2,explanation:"A CSS kezeli többek között a színeket, elrendezést és tipográfiát."},
  {question:"Melyik technológia teszi interaktívvá a weboldalt a böngészőben?",answers:["JavaScript","PNG","HTML attribútumok önmagukban","DNS"],correct:0,explanation:"A JavaScript kezeli a dinamikus viselkedést és a felhasználói eseményeket."},
  {question:"Mire szolgál a CSS media query?",answers:["Képek tömörítésére","A weboldal reszponzív megjelenésének szabályozására","Jelszavak titkosítására","Fájlok feltöltésére"],correct:1,explanation:"A media query segítségével például képernyőméret alapján változtathatunk a stílusokon."},
  {question:"Melyik HTML-elem alkalmas egy másik oldalra mutató hivatkozás létrehozására?",answers:["<section>","<strong>","<a>","<footer>"],correct:2,explanation:"Az <a> elem href attribútumával hozunk létre hivatkozásokat."}
];
const panel=document.querySelector("#quizPanel");
const lastQuizSummary=document.querySelector("#lastQuizSummary");

// A korábbi kvízeredmény visszaolvasása a LocalStorage-ból.
try {
  const previousResult = JSON.parse(localStorage.getItem("eduplatform-last-quiz") || "null");
  if (previousResult && lastQuizSummary) {
    lastQuizSummary.hidden = false;
    const dateText = previousResult.date ? new Date(previousResult.date).toLocaleString("hu-HU") : "korábban";
    lastQuizSummary.innerHTML = `<strong>Legutóbbi eredményed:</strong> ${previousResult.score}/${previousResult.total} pont (${previousResult.percent}%) · ${dateText}.`;
  }
} catch (error) {
  console.warn("A korábbi kvízeredmény nem olvasható.", error);
}
const counter=document.querySelector("#questionCounter");
const scoreLabel=document.querySelector("#scoreLabel");
const progressBar=document.querySelector("#progressBar");
const title=document.querySelector("#questionTitle");
const answerList=document.querySelector("#answerList");
const feedback=document.querySelector("#feedback");
const nextButton=document.querySelector("#nextButton");
let current=0,score=0,selected=null,answered=false;

function renderQuestion(){
  const q=questions[current];selected=null;answered=false;
  counter.textContent=`${current+1} / ${questions.length} kérdés`;
  scoreLabel.textContent=`Eredmény: ${score} pont`;
  progressBar.style.width=`${((current+1)/questions.length)*100}%`;
  title.textContent=q.question;feedback.textContent="Válassz egy választ a folytatáshoz.";
  answerList.innerHTML="";
  q.answers.forEach((answer,index)=>{
    const button=document.createElement("button");button.type="button";button.className="answer-option";
    const letter=document.createElement("span");letter.className="answer-letter";letter.textContent=String.fromCharCode(65+index);
    const text=document.createElement("span");text.textContent=answer;
    button.append(letter,text);button.addEventListener("click",()=>selectAnswer(index));answerList.append(button);
  });
  nextButton.disabled=true;nextButton.textContent=current===questions.length-1?"Eredmény megtekintése →":"Következő →";
}
function selectAnswer(index){
  if(answered)return;selected=index;answered=true;
  const q=questions[current];const buttons=[...answerList.querySelectorAll("button")];
  buttons.forEach((button,i)=>{button.disabled=true;if(i===q.correct)button.classList.add("correct");if(i===index&&i!==q.correct)button.classList.add("wrong");});
  if(index===q.correct){score++;feedback.textContent="Helyes válasz! "+q.explanation;}else{feedback.textContent="Most nem sikerült. "+q.explanation;}
  scoreLabel.textContent=`Eredmény: ${score} pont`;nextButton.disabled=false;
}
function showResult(){
  const percent=Math.round(score/questions.length*100);
  try {
    const result = {score,total:questions.length,percent,date:new Date().toISOString()};
    localStorage.setItem("eduplatform-last-quiz",JSON.stringify(result));
    const attempts = Number(localStorage.getItem("eduplatform-quiz-attempts") || "0") + 1;
    localStorage.setItem("eduplatform-quiz-attempts", String(attempts));
    const previousBest = Number(localStorage.getItem("eduplatform-best-quiz-score") || "0");
    if (score > previousBest) localStorage.setItem("eduplatform-best-quiz-score", String(score));
  } catch(error) { console.warn("Az eredmény helyi mentése nem sikerült.",error); }
  panel.innerHTML=`<div class="quiz-result"><div class="result-circle"><span>✦</span></div><div class="eyebrow">TUDÁSPRÓBA BEFEJEZVE</div><div class="result-score">${score}/${questions.length}</div><h2>${percent>=80?"Remek munka!":percent>=60?"Szép eredmény!":"Minden gyakorlással fejlődsz!"}</h2><p>${percent>=80?"Nagyon jól ismered a webfejlesztés alapjait.":percent>=60?"Jó úton haladsz. Ismételd át a nehezebb témákat!":"Nézd át a tanfolyamokat, majd próbáld újra a kvízt."}<br>Elért eredmény: ${percent}%.</p><button class="button button-primary" id="restartButton">Újrapróbálom ↻</button> <a class="button button-light" href="../courses/index.html">Tanfolyamok →</a></div>`;
  document.querySelector("#restartButton").addEventListener("click",()=>{current=0;score=0;selected=null;answered=false;panel.innerHTML='<div class="quiz-top"><span id="questionCounter">1 / 5 kérdés</span><span id="scoreLabel">Eredmény: 0 pont</span></div><div class="quiz-progress"><span id="progressBar" style="width:20%"></span></div><h2 class="question-title" id="questionTitle"></h2><div class="answer-list" id="answerList"></div><p class="quiz-feedback" id="feedback"></p><div class="quiz-actions"><a class="button button-light" href="../courses/index.html">← Tanfolyamok</a><button class="button button-primary" id="nextButton" disabled>Következő →</button></div>';location.reload();});
}
nextButton.addEventListener("click",()=>{if(!answered)return;if(current<questions.length-1){current++;renderQuestion();}else showResult();});
renderQuestion();
