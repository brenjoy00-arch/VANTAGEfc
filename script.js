let userRole = 'coach';
let activeColor = 'blue';

// 1. AUTHENTICATION
function quickLogin(role) {
  const f = (role === 'coach') ? "Dave" : "Jack";
  const l = (role === 'coach') ? "Coach" : "Player";
  const c = "Strikers FC";
  const leg = "Premier League";
  finalizeLogin(role, f, l, c, leg);
}

function handleLogin(role) {
  const f = document.getElementById('reg-first').value;
  const l = document.getElementById('reg-last').value;
  const c = document.getElementById('reg-club').value;
  const leg = document.getElementById('reg-league').value;
  if (!f || !c) return alert("First Name and Club are required!");
  finalizeLogin(role, f, l, c, leg);
}

function finalizeLogin(role, f, l, c, leg) {
  userRole = role;
  document.body.className = `user-${role}`;
  
  // Header & Profile Updates
  document.getElementById('user-welcome').innerText = `HI, ${f.toUpperCase()}!`;
  document.getElementById('club-display').innerText = c;
  document.getElementById('home-team-name-display').innerText = c;
  document.getElementById('home-team-logo').innerText = c.substring(0,2).toUpperCase();
  document.getElementById('league-club-display').innerText = c.toUpperCase();
  
  document.getElementById('prof-name').innerText = `${f} ${l}`;
  document.getElementById('prof-club').innerText = `${c} | ${leg}`;
  document.getElementById('prof-initials').innerText = f.substring(0,2).toUpperCase();
  
  const badge = document.getElementById('role-badge');
  badge.innerText = role.toUpperCase();
  badge.className = `text-[8px] font-black px-2 py-1 rounded-md uppercase ${role === 'coach' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`;

  document.getElementById('screen-auth').classList.add('hidden');
  document.getElementById('screen-main').classList.remove('hidden');
  
  initTactics();
  addPoll("Availability: Sat vs Titans FC?", ["Available ✅", "Unavailable ❌", "Late ⏳"]);
}

// 2. MESSAGING & POLLS
function postMessage() {
  const input = document.getElementById('chat-input');
  if (!input.value.trim()) return;
  const feed = document.getElementById('chat-feed');
  const msg = `<div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"><p class="text-[9px] font-black text-emerald-600 uppercase mb-1">Squad Note</p><p class="text-xs text-gray-700">${input.value}</p></div>`;
  feed.insertAdjacentHTML('afterbegin', msg);
  input.value = "";
}

function addPoll(title, options) {
  const feed = document.getElementById('chat-feed');
  const poll = `<div class="bg-white p-5 rounded-3xl shadow-sm border-2 border-emerald-500 mt-4"><p class="text-sm font-black mb-4">${title}</p><div class="space-y-2">${options.map(o => `<button onclick="this.classList.toggle('bg-emerald-500'); this.classList.toggle('text-white')" class="w-full text-left p-3 border border-gray-100 text-[10px] font-black rounded-xl">${o}</button>`).join('')}</div></div>`;
  feed.insertAdjacentHTML('afterbegin', poll);
}

function togglePollModal() { document.getElementById('poll-modal').classList.toggle('hidden'); }
function addPollFromInput() {
  const t = document.getElementById('poll-title').value;
  if (t) addPoll(t, ["Yes", "No"]);
  togglePollModal();
}

// 3. GOAL SCORER TRACKER
function addGoal() {
    const input = document.getElementById('goal-input');
    if (!input.value) return;
    const list = document.getElementById('goal-list');
    const goal = `<div class="flex items-center text-[10px] font-black text-gray-600 uppercase"><i class="fas fa-futbol mr-2 text-emerald-500"></i> ${input.value}</div>`;
    list.insertAdjacentHTML('beforeend', goal);
    input.value = "";
}

// 4. TACTICS BOARD
function initTactics() {
  const pitch = document.getElementById('tactical-pitch');
  pitch.onmousedown = function(e) {
    if (userRole !== 'coach' || e.target.classList.contains('counter')) return;
    const rect = pitch.getBoundingClientRect();
    const initials = prompt("Position (e.g. ST):");
    if (!initials) return;
    const counter = document.createElement('div');
    counter.className = `counter ${activeColor === 'blue' ? 'bg-blue-600' : 'bg-red-600'}`;
    counter.style.left = `${e.clientX - rect.left - 22}px`;
    counter.style.top = `${e.clientY - rect.top - 22}px`;
    counter.innerText = initials.toUpperCase().substring(0, 2);
    counter.onclick = (ev) => { ev.stopPropagation(); if(confirm("Delete marker?")) counter.remove(); };
    pitch.appendChild(counter);
  };
}

function setMarkerColor(c) {
  activeColor = c;
  document.getElementById('btn-blue').classList.toggle('scale-110', c === 'blue');
  document.getElementById('btn-red').classList.toggle('scale-110', c === 'red');
}

function clearMarkers() { if(confirm("Reset Board?")) document.querySelectorAll('.counter').forEach(c => c.remove()); }

// 5. DRILLS, LINEUP & NAV
function addDrill() {
  const t = document.getElementById('drill-title').value;
  const n = document.getElementById('drill-notes').value;
  const c = document.getElementById('drill-clip').value;
  if (!t) return;
  const drill = `<div class="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100"><h4 class="font-black text-sm uppercase mb-1">${t}</h4><p class="text-[11px] text-gray-600 mb-4">${n}</p>${c ? `<a href="${c}" target="_blank" class="block w-full text-center py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase">Watch Video</a>` : ''}</div>`;
  document.getElementById('drill-feed').insertAdjacentHTML('afterbegin', drill);
}

function showTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.replace('text-emerald-600', 'text-gray-300'));
  if (btn) btn.classList.replace('text-gray-300', 'text-emerald-600');
}

function setSlot(el) {
  if (userRole !== 'coach') return;
  const name = prompt("Assign Player Name:");
  if (name) el.innerText = name.toUpperCase().substring(0, 3);
}
