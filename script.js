/* lucide icon shapes */
const ICONS = {"heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>", "camera": "<path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/>", "music": "<path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/>", "list-music": "<path d=\"M21 15V6\"/><path d=\"M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z\"/><path d=\"M12 12H3\"/><path d=\"M16 6H3\"/><path d=\"M12 18H3\"/>", "shuffle": "<path d=\"m18 14 4 4-4 4\"/><path d=\"m18 2 4 4-4 4\"/><path d=\"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22\"/><path d=\"M2 6h1.972a4 4 0 0 1 3.6 2.2\"/><path d=\"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45\"/>", "skip-back": "<polygon points=\"19 20 9 12 19 4 19 20\"/><line x1=\"5\" x2=\"5\" y1=\"19\" y2=\"5\"/>", "skip-forward": "<polygon points=\"5 4 15 12 5 20 5 4\"/><line x1=\"19\" x2=\"19\" y1=\"5\" y2=\"19\"/>", "play": "<polygon points=\"6 3 20 12 6 21 6 3\"/>", "pause": "<rect x=\"14\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"/>", "repeat": "<path d=\"m17 2 4 4-4 4\"/><path d=\"M3 11v-1a4 4 0 0 1 4-4h14\"/><path d=\"m7 22-4-4 4-4\"/><path d=\"M21 13v1a4 4 0 0 1-4 4H3\"/>", "instagram": "<rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\"/><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"/><line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\"/>", "sparkles": "<path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/>", "ribbon": "<path d=\"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22\"/><path d=\"m12 18 2.57-3.5\"/><path d=\"M6.243 9.016a7 7 0 0 1 11.507-.009\"/><path d=\"M9.35 14.53 12 11.22\"/><path d=\"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z\"/>"};

/* =====================================================================
   Aurish & Nick - plain JavaScript version (no framework, no build step)
   ===================================================================== */

/* ---------------------------- EDIT ME ---------------------------- */
const START = new Date(2025, 9, 13); // together since (month is 0-based: 9 = October)

const TRACKS = [
  { title: "Our Song", artist: "Aurish & Nick", url: "", cover: "" },
  { title: "Song number two", artist: "Artist name", url: "", cover: "" },
  { title: "Song number three", artist: "Artist name", url: "", cover: "" },
];

const PHOTOS = { "2025-10-13": { src: "photos/2025-10-13.jpg", note: "The day it all began" } };

const LETTER = {
  to: "My love,",
  from: "Aurish",
  body: [
    "Every day with you feels softer, brighter, and a little more like home.",
    "Thank you for the quiet mornings, the silly jokes, and for choosing me again and again.",
    "Replace these words with your own. I’m so glad it’s you.",
  ],
};

const INSTAGRAM = {
  aurish: { user: "aurish", name: "Aurish", bio: "Your bio here", posts: "", followers: "", following: "" },
  nick: { user: "nick", name: "Nick", bio: "Your bio here", posts: "", followers: "", following: "" },
};

const CELEBRATE = {
  days: 3,
  monthsary: "Happy Monthsary!",
  anniversary: "Happy Anniversary!",
  sticker: "stickers/celebrate.png",
  voiceMonthsary: "audio/monthsary.mp3",
  voiceAnniversary: "audio/anniversary.mp3",
};
const ALBUM_STICKERS = [["stickers/bow.png", "cs-tl"], ["stickers/heart.png", "cs-tr"], ["stickers/flower.png", "cs-bl"], ["stickers/spark.png", "cs-br"]];
const POPUP_STICKERS = ["stickers/bow.png", "stickers/heart.png", "stickers/flower.png", "stickers/spark.png"];
/* ------------------------------------------------------------------ */

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const icon = (n, cls = "", sw = 2, fill = "none") =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${n}${cls ? " " + cls : ""}" aria-hidden="true">${ICONS[n]}</svg>`;
function hydrate() {
  document.querySelectorAll("[data-icon]").forEach(el => {
    const t = document.createElement("template");
    t.innerHTML = icon(el.dataset.icon, el.dataset.cls || "", el.dataset.sw || 2);
    el.replaceWith(t.content.firstChild);
  });
}

/* ---------------------------- date helpers ---------------------------- */
const dateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const daysTogether = (now = new Date()) =>
  Math.max(0, Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - START) / 864e5));
const shiftMonth = (y, m, delta) => { const n = y * 12 + m + delta; return { y: Math.floor(n / 12), m: ((n % 12) + 12) % 12 }; };
const photosInMonth = (y, m) => Object.keys(PHOTOS).filter(k => k.startsWith(`${y}-${String(m + 1).padStart(2, "0")}-`)).length;
function milestone(date) {
  for (let back = 0; back < CELEBRATE.days; back++) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - back);
    if (d.getDate() !== START.getDate()) continue;
    const months = (d.getFullYear() - START.getFullYear()) * 12 + d.getMonth() - START.getMonth();
    if (months < 1) return null;
    return months % 12 === 0 ? { type: "anniversary", n: months / 12 } : { type: "monthsary", n: months };
  }
  return null;
}
const ordinal = n => { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const BLOCKED = /youtu\.?be|spotify\.com|soundcloud\.com|music\.apple\.com|deezer\.com/i;
const directAudio = url => url
  .replace(/^(https?:\/\/(?:www\.)?dropbox\.com\/[^?]*)\?.*$/, "$1?raw=1")
  .replace(/^https?:\/\/drive\.google\.com\/file\/d\/([^/]+).*$/, "https://drive.google.com/uc?export=download&id=$1");
function trackProblem(url) {
  if (!url) return "Add this song’s link in the playlist, then press play.";
  if (BLOCKED.test(url)) return "That link can’t play here. Use an .mp3 file or a direct .mp3 link.";
  return "";
}

/* ---------------------------- state ---------------------------- */
let today = new Date();
let cur = { y: today.getFullYear(), m: today.getMonth() };
let envOpen = false, popupKind = null, shownAt = 0, voice = null, stopBurst = () => {};

/* ---------------------------- drag (widgets) ---------------------------- */
const PEEK = 34;
function drag(el, onTap) {
  let sx = 0, sy = 0, ox = 0, oy = 0, moved = false, down = false, lx = 0, lt = 0, vx = 0, gt = 0;
  const edge = (id, on) => { const e = document.getElementById(id); if (e) e.classList.toggle("on", on); };
  const place = (x, y) => { el.style.left = x + "px"; el.style.top = y + "px"; el.style.right = "auto"; el.style.bottom = "auto"; };
  const glide = (x, y) => { el.classList.add("glide"); place(x, y); clearTimeout(gt); gt = setTimeout(() => el.classList.remove("glide"), 650); };
  const dock = side => {
    el.dataset.dock = side;
    el.classList.toggle("dock-l", side === "L");
    el.classList.toggle("dock-r", side === "R");
    glide(side === "L" ? PEEK - el.offsetWidth : innerWidth - PEEK, el.offsetTop);
  };
  const undock = () => {
    const side = el.dataset.dock;
    delete el.dataset.dock;
    el.classList.remove("dock-l", "dock-r");
    glide(side === "L" ? 12 : innerWidth - el.offsetWidth - 12, el.offsetTop);
  };
  el.addEventListener("pointerdown", e => {
    if (e.target.closest("[data-nodrag]")) return;
    down = true; moved = false; vx = 0;
    sx = lx = e.clientX; sy = e.clientY; lt = performance.now();
    ox = el.offsetLeft; oy = el.offsetTop;
    el.classList.remove("glide");
    el.setPointerCapture(e.pointerId);
  });
  el.addEventListener("pointermove", e => {
    if (!down) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.abs(dx) + Math.abs(dy) > 6) { moved = true; el.classList.add("dragging"); }
    if (!moved) return;
    const w = el.offsetWidth, h = el.offsetHeight;
    place(Math.min(innerWidth - PEEK, Math.max(PEEK - w, ox + dx)), Math.min(innerHeight - h, Math.max(0, oy + dy)));
    const now = performance.now();
    vx = vx * 0.7 + ((e.clientX - lx) / Math.max(1, now - lt)) * 2.4;
    lx = e.clientX; lt = now;
    el.style.rotate = Math.max(-8, Math.min(8, vx * 3)) + "deg";
    const x = el.offsetLeft;
    edge("edgeL", x < 40);
    edge("edgeR", x + w > innerWidth - 40);
  });
  const end = () => {
    if (!down) return;
    down = false;
    el.classList.remove("dragging");
    el.style.rotate = "";
    edge("edgeL", false); edge("edgeR", false);
    if (!moved) { if (el.dataset.dock) undock(); else if (onTap) onTap(); return; }
    const w = el.offsetWidth, x = el.offsetLeft;
    const out = Math.max(0, -x) + Math.max(0, x + w - innerWidth);
    if (out > w * 0.35) dock(x + w / 2 < innerWidth / 2 ? "L" : "R");
    else {
      delete el.dataset.dock;
      el.classList.remove("dock-l", "dock-r");
      if (out) glide(Math.min(innerWidth - w - 12, Math.max(12, x)), el.offsetTop);
    }
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);
  el.addEventListener("keydown", e => {
    if ((e.key !== "Enter" && e.key !== " ") || e.target !== el) return;
    e.preventDefault();
    if (el.dataset.dock) undock(); else if (onTap) onTap();
  });
  addEventListener("resize", () => {
    if (el.dataset.dock) el.style.left = (el.dataset.dock === "L" ? PEEK - el.offsetWidth : innerWidth - PEEK) + "px";
  });
}

/* ---------------------------- Aurish + Nick ---------------------------- */
function renderPeople() {
  const person = p => {
    const stats = [["posts", p.posts], ["followers", p.followers], ["following", p.following]].filter(s => s[1]);
    return `<div class="who"><div class="av" aria-hidden="true">${esc(p.name.slice(0, 1))}</div>${esc(p.name)}
      <div class="ig"><div class="ig-head">
        <span class="ig-ring"><span class="ig-pic">${esc(p.name.slice(0, 1))}</span></span>
        <div class="ig-id"><b>@${esc(p.user)}</b><small>${esc(p.name)}</small></div>${icon("instagram", "ig-logo")}</div>
        ${stats.length ? `<div class="ig-stats">${stats.map(s => `<span><b>${esc(s[1])}</b>${s[0]}</span>`).join("")}</div>` : ""}
        ${p.bio ? `<p>${esc(p.bio)}</p>` : ""}
        <a class="ig-btn" href="https://instagram.com/${esc(p.user)}" target="_blank" rel="noopener noreferrer">View profile</a>
      </div></div>`;
  };
  $("#pair").innerHTML = person(INSTAGRAM.aurish) + icon("heart", "beat") + person(INSTAGRAM.nick);
  document.querySelectorAll(".who").forEach(who => {
    const card = $(".ig", who);
    const fit = () => {
      const r = who.getBoundingClientRect(), cx = r.left + r.width / 2, half = card.offsetWidth / 2;
      let shift = 0;
      if (cx - half < 8) shift = 8 - (cx - half);
      else if (cx + half > innerWidth - 8) shift = innerWidth - 8 - (cx + half);
      card.style.setProperty("--shift", shift + "px");
    };
    who.addEventListener("pointerenter", () => { who.classList.remove("shut"); fit(); });
    who.addEventListener("focusin", fit);
    who.addEventListener("click", e => {
      if (e.target.closest("a") || !matchMedia("(hover: none)").matches) return;
      fit();
      who.classList.toggle("open");
    });
    $(".ig-btn", who).addEventListener("click", () => { who.classList.add("shut"); who.classList.remove("open"); });
  });
}
document.addEventListener("pointerdown", e =>
  document.querySelectorAll(".who.open").forEach(w => { if (!w.contains(e.target)) w.classList.remove("open"); }));

/* ---------------------------- album calendar ---------------------------- */
function renderAlbum() {
  const { y, m } = cur, count = photosInMonth(y, m);
  const days = new Date(y, m + 1, 0).getDate(), lead = new Date(y, m, 1).getDay();
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const p = shiftMonth(y, m, -1), n = shiftMonth(y, m, 1);
  let grid = [..."SMTWTFS"].map(d => `<div class="wd">${d}</div>`).join("") + '<div class="pad"></div>'.repeat(lead);
  for (let d = 1; d <= days; d++) {
    const k = dateKey(y, m, d), has = k in PHOTOS;
    grid += `<button type="button" class="d${k === todayKey ? " t" : ""}${has ? " has on" : ""}" data-k="${k}" aria-label="Open ${MONTHS[m]} ${d}, ${y}"><span class="day-num">${d}</span>${icon("heart", has ? "heart-ico h-glow" : "heart-ico", 1.8, has ? "currentColor" : "none")}</button>`;
  }
  $("#album").innerHTML = ALBUM_STICKERS.map(s => `<img class="corner-sticker ${s[1]}" src="${s[0]}" alt="">`).join("") + `
    <h2>Our album</h2>
    <p class="${count ? "cnt" : "cnt none"}" aria-live="polite">${icon("camera")}<span>${count ? `<b>${count}</b> picture${count === 1 ? "" : "s"} this month` : "No pictures yet this month"}</span></p>
    <div class="nav">
      <div><button type="button" data-go="-12" aria-label="Previous year">«</button>
      <button type="button" data-go="-1"${photosInMonth(p.y, p.m) ? ' class="more"' : ""} aria-label="Previous month">‹</button></div>
      <button type="button" class="cm" aria-label="Back to this month">${MONTHS[m]} ${y}</button>
      <div><button type="button" data-go="1"${photosInMonth(n.y, n.m) ? ' class="more"' : ""} aria-label="Next month">›</button>
      <button type="button" data-go="12" aria-label="Next year">»</button></div>
    </div>
    <div class="grid">${grid}</div>
    <p class="hint">Tap a glowing heart to open that day’s picture</p>`;
}
$("#album").addEventListener("click", e => {
  const go = e.target.closest("[data-go]"), day = e.target.closest(".d");
  if (go) { cur = shiftMonth(cur.y, cur.m, +go.dataset.go); renderAlbum(); }
  else if (e.target.closest(".cm")) { cur = { y: today.getFullYear(), m: today.getMonth() }; renderAlbum(); }
  else if (day) openPhoto(day.dataset.k);
});

/* ---------------------------- popups ---------------------------- */
const ov = $("#ov"), box = $("#box");
function openPopup(html, kind, confetti) {
  const old = $(".confetti", ov); if (old) old.remove();
  box.innerHTML = '<button type="button" class="x" aria-label="Close">×</button>' + html;
  if (confetti) ov.insertBefore(makeConfetti(), box);
  ov.classList.add("show");
  popupKind = kind; shownAt = Date.now();
}
function requestClose() {
  if (!popupKind || Date.now() - shownAt < 450) return;
  const kind = popupKind;
  popupKind = null;
  ov.classList.remove("show");
  box.innerHTML = "";
  const c = $(".confetti", ov); if (c) c.remove();
  if (voice) { voice.pause(); voice = null; }
  if (kind === "letter") setTimeout(closeEnv, 420);
}
ov.addEventListener("click", e => { if (box.contains(e.target) && !e.target.closest(".x")) return; requestClose(); });
addEventListener("keydown", e => { if (e.key === "Escape") requestClose(); });

function openPhoto(key) {
  const ph = PHOTOS[key], [y, mo, d] = key.split("-"), label = `${MONTHS[+mo - 1]} ${+d}, ${y}`;
  const st = POPUP_STICKERS[Math.floor(Math.random() * POPUP_STICKERS.length)];
  openPopup(`<div class="pc"><img class="popup-sticker" src="${st}" alt="">
    <div class="ph">${ph && ph.src ? `<img src="${esc(ph.src)}" alt="Photo from ${label}">` : "<span>No picture for this day yet</span>"}</div>
    <p class="cap">${esc((ph && ph.note) || label)}</p></div>`, "photo");
}
function openLetter() {
  openPopup(`<article class="a4"><h3>${esc(LETTER.to)}</h3>${LETTER.body.map(p => `<p>${esc(p)}</p>`).join("")}<p class="sg">— ${esc(LETTER.from)}</p></article>`, "letter");
}
function makeConfetti() {
  const c = document.createElement("div");
  c.className = "confetti"; c.setAttribute("aria-hidden", "true");
  const tones = ["bit-rose", "bit-lav", "bit-white", "bit-plum"];
  for (let i = 0; i < 24; i++) {
    const b = document.createElement("i");
    b.className = "bit " + tones[i % 4];
    b.style.cssText = `left:${(i * 37) % 100}%;animation-duration:${3.4 + (i % 5) * 0.45}s;animation-delay:${(i % 7) * 0.18}s;--sway:${(i % 2 ? 1 : -1) * (20 + (i % 5) * 12)}px;--spin:${(i % 2 ? 1 : -1) * (120 + i * 18)}deg`;
    c.append(b);
  }
  return c;
}
function openParty(ms) {
  const anniv = ms.type === "anniversary", n = ms.n;
  const src = anniv ? CELEBRATE.voiceAnniversary : CELEBRATE.voiceMonthsary;
  openPopup(`<div class="party"><img class="party-sticker" src="${CELEBRATE.sticker}" alt="">
    <div class="party-ribbon">${ordinal(n)} ${anniv ? "anniversary" : "monthsary"}</div>
    <h2>${anniv ? CELEBRATE.anniversary : CELEBRATE.monthsary}</h2>
    <p>${n} ${anniv ? "year" : "month"}${n > 1 ? "s" : ""} of loving each other</p>
    <div class="vn-card"><button type="button" class="vn-btn" aria-label="Play voice message">${icon("play")}</button>
      <div class="vn-info"><b>Voice message</b><small>Tap to play our special message</small></div></div>
    <div class="party-hearts" aria-hidden="true">${icon("heart").repeat(3)}</div>
    <small class="fine num">Aurish &amp; Nick · ${daysTogether()} days together</small></div>`, "party", true);
  const btn = $(".vn-btn", box), hint = $(".vn-info small", box);
  const set = p => { btn.innerHTML = icon(p ? "pause" : "play"); btn.setAttribute("aria-label", p ? "Pause voice message" : "Play voice message"); };
  btn.onclick = () => {
    if (!voice) {
      voice = new Audio(src);
      voice.onended = () => set(false);
      voice.onerror = () => { set(false); hint.textContent = "Add your voice note and it will play here"; };
    }
    if (voice.paused) voice.play().then(() => set(true)).catch(() => { hint.textContent = "Tap again to start the message"; });
    else { voice.pause(); set(false); }
  };
}

/* ---------------------------- envelope ---------------------------- */
const ew = $("#ew"), env = $("#env");
function burst() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const room = Math.max(110, Math.min(260, env.getBoundingClientRect().top - 8));
  const glyphs = ["♥", "♥", "✿", "✦", "♥", "✿"], colors = ["#e59abf", "#b89ae6", "#f2c1d6", "#c7b4f0"], nodes = [];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("i");
    p.className = "p"; p.textContent = glyphs[i % glyphs.length];
    p.style.color = colors[i % colors.length]; p.style.fontSize = `${14 + (i % 5) * 3}px`;
    env.append(p); nodes.push(p);
    const dx = (i - 8) * 14, rise = room * (0.55 + (i % 4) * 0.1);
    p.animate([
      { opacity: 0, transform: "translate(-50%, 0) scale(0.5)" },
      { opacity: 1, offset: 0.18, transform: `translate(calc(-50% + ${dx / 2}px), ${-rise * 0.45}px) scale(1)` },
      { opacity: 0, transform: `translate(calc(-50% + ${dx}px), ${-rise}px) scale(0.85)` },
    ], { duration: 1500 + (i % 4) * 180, delay: 180 + i * 45, fill: "forwards" });
  }
  const t = setTimeout(() => nodes.forEach(n => n.remove()), 2600);
  return () => { clearTimeout(t); nodes.forEach(n => n.remove()); };
}
function openEnv() { envOpen = true; ew.classList.add("open"); ew.setAttribute("aria-label", "Read the love letter"); stopBurst(); stopBurst = burst(); }
function closeEnv() { envOpen = false; ew.classList.remove("open"); ew.setAttribute("aria-label", "Open the love letter"); stopBurst(); stopBurst = () => {}; }
drag(ew, () => { if (!envOpen) openEnv(); else openLetter(); });

/* ---------------------------- music player ---------------------------- */
const mw = $("#mw"), sk = $("#sk"), cv = $("#cv"), list = $("#list"), lb = $("#lb"), msg = $("#msg"), pp = $("#pp"), hintEl = $("#hint");
const au = new Audio();
let idx = 0, shuffle = false;
const clock = s => (!isFinite(s) || s < 0) ? "0:00" : Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
const say = t => { msg.textContent = t; msg.hidden = !t; };
function paint(t = au.currentTime || 0, d = isFinite(au.duration) ? au.duration : 0) {
  $("#tc").textContent = clock(t);
  $("#tr").textContent = "-" + clock(d ? d - t : 0);
  sk.value = d ? Math.round(t / d * 1000) : 0;
  sk.style.setProperty("--p", (d ? t / d * 100 : 0) + "%");
}
function renderList() {
  list.innerHTML = TRACKS.map((t, i) => `<li><button type="button" data-i="${i}" data-nodrag${i === idx ? ' class="on"' : ""}><span class="n">${i + 1}</span><span class="t"><b>${esc(t.title)}</b><small>${esc(t.artist)}</small></span></button></li>`).join("");
}
function showTrack() {
  const t = TRACKS[idx];
  $("#tt").textContent = t.title; $("#ta").textContent = t.artist;
  cv.hidden = true;
  if (t.cover) cv.src = t.cover; else cv.removeAttribute("src");
  renderList();
}
function playIndex(i, go) {
  idx = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
  const t = TRACKS[idx], problem = trackProblem(t.url);
  showTrack(); paint(0, 0);
  hintEl.textContent = t.url ? "" : problem;
  say(t.url && problem ? problem : "");
  au.pause();
  if (t.url && !problem) {
    au.src = directAudio(t.url);
    if (go) au.play().catch(() => say("Tap play again to start the music."));
  } else { au.removeAttribute("src"); au.load(); }
}
function togglePlay() {
  const t = TRACKS[idx], problem = trackProblem(t.url);
  if (problem) { say(problem); hintEl.textContent = t.url ? "" : problem; return; }
  if (!au.getAttribute("src")) au.src = directAudio(t.url);
  if (au.paused) au.play().catch(() => say("Tap play again to start the music.")); else au.pause();
}
function skip(dir) {
  if (TRACKS.length > 1) { playIndex(shuffle ? Math.floor(Math.random() * TRACKS.length) : idx + dir, !au.paused); return; }
  au.currentTime = Math.max(0, au.currentTime + dir * 10);
}
const setPlaying = p => {
  mw.classList.toggle("playing", p);
  pp.innerHTML = icon(p ? "pause" : "play");
  pp.setAttribute("aria-label", p ? "Pause" : "Play");
};
au.addEventListener("timeupdate", () => paint());
au.addEventListener("loadedmetadata", () => paint());
au.addEventListener("play", () => setPlaying(true));
au.addEventListener("pause", () => setPlaying(false));
au.addEventListener("error", () => { if (au.getAttribute("src")) say("Couldn’t load this song. Use a direct .mp3 link."); });
au.addEventListener("ended", () => { if (TRACKS.length > 1) playIndex(shuffle ? Math.floor(Math.random() * TRACKS.length) : idx + 1, true); });
cv.onload = () => { cv.hidden = false; };
cv.onerror = () => { cv.hidden = true; };
sk.addEventListener("input", () => {
  const d = au.duration;
  if (isFinite(d) && d) au.currentTime = sk.value / 1000 * d;
  paint();
});
pp.onclick = togglePlay;
$("#rw").onclick = () => skip(-1);
$("#fw").onclick = () => skip(1);
$("#sh").onclick = e => { shuffle = !shuffle; e.currentTarget.classList.toggle("on", shuffle); e.currentTarget.setAttribute("aria-pressed", shuffle); };
$("#rp").onclick = e => { au.loop = !au.loop; e.currentTarget.classList.toggle("on", au.loop); e.currentTarget.setAttribute("aria-pressed", au.loop); };
lb.onclick = () => { list.hidden = !list.hidden; lb.setAttribute("aria-pressed", !list.hidden); };
list.addEventListener("click", e => {
  const b = e.target.closest("button[data-i]");
  if (!b) return;
  playIndex(+b.dataset.i, true);
  list.hidden = true; lb.setAttribute("aria-pressed", "false");
});
drag(mw);

/* ---------------------------- start up ---------------------------- */
hydrate();
renderPeople();
renderAlbum();
$("#days").textContent = daysTogether(today);
playIndex(0, false);
setPlaying(false);

// celebration popup (monthsary / anniversary). Test it with  index.html?celebrate=monthsary  or  ?celebrate=anniversary
const demo = new URLSearchParams(location.search).get("celebrate");
const found = demo ? { type: demo === "monthsary" ? "monthsary" : "anniversary", n: demo === "monthsary" ? 3 : 1 } : milestone(new Date());
if (found) setTimeout(() => openParty(found), 700);

// roll over to the next day at midnight
(function arm() {
  const n = new Date();
  setTimeout(() => {
    today = new Date();
    $("#days").textContent = daysTogether(today);
    renderAlbum();
    arm();
  }, new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1) - n + 400);
})();
