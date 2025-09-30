// Profile data
const profile = {
  id: "hetviy123456 ",
  name: "Hetvi",
  pic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  segregation: 82,
  feedback: 9,
  collectedAt: new Date(),
  history: [
    { seg: 75, feedback: 8, date: "2025-09-20", time: "10:15 AM" },
    { seg: 68, feedback: 7, date: "2025-09-18", time: "05:42 PM" },
    { seg: 80, feedback: 9, date: "2025-09-15", time: "09:05 AM" },
    { seg: 72, feedback: 6, date: "2025-09-10", time: "03:25 PM" },
    { seg: 85, feedback: 10, date: "2025-09-05", time: "08:45 AM" }
  ]
};

// Fill profile
document.querySelector("#profile-name").textContent = profile.name;
document.querySelector("#profile-id").textContent = "ID: " + profile.id;
document.querySelector("#profile-pic").src = profile.pic;

// Feedback (latest/live)
document.querySelector("#feedback-points").textContent = profile.feedback;
const d = profile.collectedAt;
document.querySelector("#feedback-date").textContent = d.toLocaleDateString();
document.querySelector("#feedback-time").textContent = d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});

// Live segregation
const pct = profile.segregation;
document.querySelector("#seg-value").textContent = pct + "%";
document.querySelector("#meter-text").textContent = pct + "%";

// Animate progress bar
setTimeout(()=> {
  document.querySelector("#progress-fill").style.width = pct + "%";
}, 100);

// Animate circle
const segValueEl = document.getElementById("seg-value");
const meterTextEl = document.getElementById("meter-text");
const meterCircle = document.querySelector(".meter-fill");

const targetPct = profile.segregation; // 82%
const circ = 2 * Math.PI * 48;          // circumference of circle
let currentPct = 0;
const duration = 1500;  // animation duration in ms
const intervalTime = 15; // update every 15ms

const step = targetPct / (duration / intervalTime);

const animateSeg = setInterval(() => {
  currentPct += step;
  if(currentPct >= targetPct){
    currentPct = targetPct;
    clearInterval(animateSeg);
  }
  const displayPct = Math.round(currentPct);
  segValueEl.textContent = displayPct + "%";
  meterTextEl.textContent = displayPct + "%";
  meterCircle.style.strokeDashoffset = circ * (1 - currentPct/100);
}, intervalTime);
const style = getComputedStyle(document.documentElement);
const start = style.getPropertyValue('--accent-start');
const end = style.getPropertyValue('--accent-end');
const stops = document.querySelectorAll("linearGradient stop");
stops[0].setAttribute("stop-color", start);
stops[1].setAttribute("stop-color", end);

// History list
const historyList = document.querySelector("#history-list");
profile.history.forEach(item=>{
  const li = document.createElement("li");
  li.innerHTML = `
    <strong>${item.date} ${item.time}</strong><br>
    Segregation: ${item.seg}% | Feedback: ${item.feedback}/10
  `;
  historyList.appendChild(li);
});
