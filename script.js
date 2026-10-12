// =====================================================================
//  Aurish & Nick  -  js/script.js
//  Everything you may want to change is inside the "EDIT ME" block.
// =====================================================================

const START = new Date(2025, 9, 13);   // anniversary 10/13/2025  (months start at 0, so 9 = October)
const $ = s => document.querySelector(s);


/* =====================================================================
   EDIT ME
   ===================================================================== */

// 1) MUSIC ------------------------------------------------------------
//    This is your playlist. Every { ... } line is one song:
//      url   = a file in the "music" folder (music/song.mp3) or a direct link ending in .mp3
//              (Dropbox / Google Drive share links are converted automatically).
//              YouTube, Spotify & co. links can NOT play inside this player.
//      cover = album picture (optional)   title / artist = what the player shows
//    Delete the lines you don't need, copy a line to add more songs.
const TRACKS = [
  { title: "Enchanted",          artist: "Taylor Swift", url: "music/Taylor Swift - Enchanted (Taylor's Version) (Lyric Video).mp3", cover: "music/enchanted.png" },
  { title: "Iris",   artist: " Goo Goo Dolls",   url: "music/Iris.mp3", cover: "music/iriscover.png" },
  { title: "Mine", artist: "Taylor Swift",   url: "music/Taylor Swift - Mine.mp3", cover: "music/enchanted.png" },
   { title: "Neighbourhood", artist: "Taylor Swift",   url: "music/Reflections.mp3", cover: "music/neighbourhood.png" },
    { title: "Everything I Do", artist: "Bryan Adams",   url: "music/Everything I do.mp3", cover: "music/bryan adams.png" },
    { title: "The Way I Loved You", artist: "Taylor Swift",   url: "music/Taylor Swift - The Way I Loved You (Taylor's Version) (Lyric Video).mp3", cover: "music/enchanted.png" }
];

// 2) PHOTOS -----------------------------------------------------------
//    Every calendar day automatically looks for  photos/YYYY-MM-DD.jpg
//    (example: photos/2025-10-13.jpg). Just drop the picture in the "photos" folder.
//    Add a line below if you want a caption on that day (its heart also turns
//    bright pink) or if the picture has a different file name.
const PHOTO_FOLDER = "photos/";
const PHOTOS = {
  "2024-10-04": { src: "photos/2024-10-04.jpg", note: "When we were complete strangers" },
  "2025-10-02": { src: "photos/2025-10-02.jpg", note: "First lunch together" },
  "2025-10-14": { src: "photos/2025-10-14.jpg", note: "First hug" },
  // "2025-12-25": { src: "photos/christmas.jpg",  note: "Our first Christmas" },
};

// 3) LETTER -----------------------------------------------------------
//    Shown on the A4 paper when the envelope is opened. Every line in "body" is a new paragraph.
const LETTER = {
  to: "My love,",
  from: "Aurish",
  body: [
    "Every day with you feels softer, brighter, and a little more like home.",
    "Thank you for the quiet mornings, the silly jokes, and for choosing me again and again.",
    "Replace these words with your own. I’m so glad it’s you."
  ]
};

// 4) INSTAGRAM --------------------------------------------------------
//    Shown when the mouse is over an avatar (on phones: tap the avatar).
//    user = Instagram username without the @   (leave "" to hide the card)
//    posts / followers / following are optional - leave "" to hide them.
const INSTAGRAM = {
  aurish: { user: "mixed_in_the_stars02", name: "mixed_in_the_stars02", bio: "Cutie pie ✨", posts: "", followers: "", following: "" },
  nick:   { user: "Nick Charlo",   name: "Nick Charlo",   bio: "Hey ✨", posts: "", followers: "", following: "" }
};

// 5) STICKERS ---------------------------------------------------------
//    Put your cat pictures in the "stickers" folder and list their file names here.
//    They are scattered over the WHOLE background (fixed in place) and wobble.
//    STICKER_SIZE is optional: 1 = normal, bigger number = bigger picture
//    (use it when one picture has lots of empty space around the cat).
const STICKER_FILES = [
  "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png",
  "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png"
];
const STICKER_SIZE = { "1.png": 1.5, "2.png": 1.5, "3.png": 1.25, "4.png": .85, "5.png": .75, "6.png": 1.45 };

// 6) CELEBRATION ------------------------------------------------------
//    On every monthsary (the 13th of each month) and on the anniversary (13 October)
//    a popup says hello. It shows on that day and stays for "days" days, then disappears.
//    Preview it any time:  open index.html?celebrate=monthsary   or   index.html?celebrate=anniversary
const CELEBRATE = {
  days: 3,
  monthsary: "Happy Monthsary!",
  anniversary: "Happy Anniversary!",
  sticker: "2.png"                 // a picture from the stickers folder shown on the popup ("" = none)
};

// 7) TRAVEL LOG ------------------------------------------------------
//    The "Our date map" under the calendar. Every { ... } line is one place you went on a date.
//      name = the place        date  = when (any text, for example "13 Oct 2025")
//      note = a short memory   emoji = the little icon on the pin
//      photo = optional picture, for example "photos/cafe.jpg"
//      next: true = a dotted "next stop" pin (a place you want to go to)
//    The pins are joined in order by a dotted road. Copy a line to add a place.
const PLACES = [
  { name: "Our first date",     date: "Oct 2025", emoji: "☕", photo: "", note: "Example: write a little memory about this place here." },
  { name: "Movie night",        date: "Nov 2025", emoji: "🎬", photo: "", note: "Example: we shared the popcorn." },
  { name: "Beach day",          date: "Dec 2025", emoji: "🏖️", photo: "", note: "Example: sand, sunset and ice cream." },
  { name: "Picnic in the park", date: "Feb 2026", emoji: "🧺", photo: "", note: "Example: sandwiches and silly photos." },
  { name: "Night market",       date: "Jun 2026", emoji: "🍢", photo: "", note: "Example: we tried every snack." },
  { name: "Next stop?",         date: "Soon",     emoji: "✈️", photo: "", note: "Our next adventure goes here.", next: true }
];

/* ===================================================================== */


/* ---------- today + days counter (updates by itself after midnight) ---------- */
let today, days;

function refreshToday() {
  const t = new Date();
  today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  days = Math.max(0, Math.round((today - START) / 864e5));
  $('#days').textContent = days;
}
refreshToday();


/* ---------- draggable widgets ---------- */
// tap = click | drag = move (lifts + tilts) | drop it past the left / right edge = it hides, a handle stays
const PEEK = 34;                                   // how much of a hidden widget stays visible

document.body.insertAdjacentHTML('beforeend', '<div class="edge" id="edgeL"></div><div class="edge" id="edgeR"></div>');
const edgeL = $('#edgeL'),
      edgeR = $('#edgeR');

function drag(el, onTap) {
  let sx, sy, ox, oy, mv, d, lx, lt, vx = 0;
  el.insertAdjacentHTML('beforeend', '<i class="tab" aria-hidden="true"></i>');

  const place = (x, y) => {
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.right = el.style.bottom = 'auto';
  };

  // springy slide to a spot
  const glide = (x, y) => {
    el.classList.add('glide');
    place(x, y);
    clearTimeout(el._g);
    el._g = setTimeout(() => el.classList.remove('glide'), 650);
  };

  const dock = side => {                           // hide at the left / right edge
    el.dataset.dock = side;
    el.classList.toggle('dock-l', side === 'L');
    el.classList.toggle('dock-r', side === 'R');
    glide(side === 'L' ? PEEK - el.offsetWidth : innerWidth - PEEK, el.offsetTop);
  };

  const undock = () => {                           // slide back out
    const side = el.dataset.dock;
    delete el.dataset.dock;
    el.classList.remove('dock-l', 'dock-r');
    glide(side === 'L' ? 12 : innerWidth - el.offsetWidth - 12, el.offsetTop);
  };
  el._undock = undock;

  el.addEventListener('pointerdown', e => {
    if (e.target.closest('[data-nodrag]')) return;
    d = 1; mv = 0; vx = 0;
    sx = e.clientX; sy = e.clientY;
    lx = e.clientX; lt = performance.now();
    ox = el.offsetLeft; oy = el.offsetTop;
    el.classList.remove('glide');
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', e => {
    if (!d) return;
    const dx = e.clientX - sx,
          dy = e.clientY - sy;
    if (!mv && Math.abs(dx) + Math.abs(dy) > 6) {
      mv = 1;
      el.classList.add('dragging');
    }
    if (!mv) return;

    const w = el.offsetWidth,
          h = el.offsetHeight;
    place(
      Math.min(innerWidth - PEEK, Math.max(PEEK - w, ox + dx)),
      Math.min(innerHeight - h, Math.max(0, oy + dy))
    );

    // tilt with the speed of the drag
    const now = performance.now();
    vx = vx * .7 + (e.clientX - lx) / Math.max(1, now - lt) * 8 * .3;
    lx = e.clientX; lt = now;
    el.style.rotate = Math.max(-9, Math.min(9, vx * 3)) + 'deg';

    // pink glow when close to an edge
    const x = el.offsetLeft;
    edgeL.classList.toggle('on', x < 40);
    edgeR.classList.toggle('on', x + w > innerWidth - 40);
  });

  const end = () => {
    if (!d) return;
    d = 0;
    el.classList.remove('dragging');
    el.style.rotate = '';
    edgeL.classList.remove('on');
    edgeR.classList.remove('on');

    if (!mv) {                                     // it was a tap
      if (el.dataset.dock) undock(); else if (onTap) onTap();
      return;
    }
    const w = el.offsetWidth,
          x = el.offsetLeft,
          out = Math.max(0, -x) + Math.max(0, x + w - innerWidth);   // how much is outside the screen
    if (out > w * .35) {
      dock(x + w / 2 < innerWidth / 2 ? 'L' : 'R');
    } else {
      delete el.dataset.dock;
      el.classList.remove('dock-l', 'dock-r');
      if (out) glide(Math.min(innerWidth - w - 12, Math.max(12, x)), el.offsetTop);
    }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

// keep hidden widgets at the edge when the window changes size
addEventListener('resize', () => document.querySelectorAll('.wg[data-dock]').forEach(w => {
  w.style.left = (w.dataset.dock === 'L' ? PEEK - w.offsetWidth : innerWidth - PEEK) + 'px';
}));


/* ---------- popup (photo card / letter) ---------- */
const ov = $('#ov'),
      box = $('#box');
let shownAt = 0,
    onHide = null;

const show = (h, cb) => {
  box.innerHTML = h + '<button class="x" aria-label="Close">✕</button>';
  ov.classList.add('show');
  shownAt = Date.now();
  onHide = cb || null;
};

const hide = () => {
  if (!ov.classList.contains('show')) return;
  ov.classList.remove('show');
  if (onHide) {
    const f = onHide;
    onHide = null;
    f();
  }
};

// the 500ms guard stops the tap that opened the popup from closing it again
ov.onclick = e => {
  if (Date.now() - shownAt > 500 && (e.target === ov || e.target.closest('.x'))) hide();
};
addEventListener('keydown', e => e.key === 'Escape' && hide());


/* ---------- music player ---------- */
// rewind / forward = previous / next song (or a 10 second skip when there is only one song)
const au = new Audio(),
      mw = $('#mw'),
      sk = $('#sk'),
      cv = $('#cv'),
      list = $('#list'),
      lb = $('#lb'),
      msg = $('#msg');
let ti = 0,
    shuf = 0;

au.loop = TRACKS.length === 1;                       // one song = repeat it, a playlist = go to the next one
$('#rp').classList.toggle('on', au.loop);

// links that can't be played by a normal audio player
const NOPE = /youtu\.?be|spotify\.com|soundcloud\.com|music\.apple\.com|deezer\.com/i;

// Dropbox / Google Drive share links -> direct links
const direct = u => u
  .replace(/^(https?:\/\/(?:www\.)?dropbox\.com\/[^?]*)\?.*$/, '$1?raw=1')
  .replace(/^https?:\/\/drive\.google\.com\/file\/d\/([^/]+).*$/, 'https://drive.google.com/uc?export=download&id=$1');

const say = text => { msg.textContent = text; msg.hidden = !text; };

const f = s => isFinite(s)
  ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0')
  : '0:00';

function tick() {
  const d = au.duration,
        c = au.currentTime,
        p = d ? c / d * 100 : 0;
  $('#tc').textContent = f(c);
  $('#tr').textContent = '-' + f(d ? d - c : 0);
  sk.value = p;
  sk.style.setProperty('--p', p + '%');
}

// playlist rows
list.innerHTML = TRACKS.map((t, i) =>
  `<li data-i="${i}"><span class="n">${i + 1}</span><span class="t"><b>${t.title}</b><small>${t.artist || ''}</small></span></li>`
).join('');

function load(i, go) {
  ti = (i + TRACKS.length) % TRACKS.length;
  const t = TRACKS[ti],
        blocked = t.url && NOPE.test(t.url);

  au.pause();
  say('');
  if (t.url && !blocked) au.src = direct(t.url); else { au.removeAttribute('src'); au.load(); }
  if (blocked) say("That link (YouTube / Spotify...) can't play here. Use an .mp3 file in the music folder or a direct .mp3 link.");

  $('#tt').textContent = t.title || 'Untitled';
  $('#ta').textContent = t.artist || '';
  $('#hint').textContent = t.url ? '' : "Add this song's link in js/script.js";
  cv.hidden = 1;
  cv.alt = t.title;
  if (t.cover) cv.src = t.cover;
  list.querySelectorAll('li').forEach((li, k) => li.classList.toggle('on', k === ti));
  tick();

  if (go && t.url && !blocked) au.play().catch(() => {});
}

const skip = d => TRACKS.length > 1
  ? load(shuf ? Math.random() * TRACKS.length | 0 : ti + d, !au.paused)
  : au.currentTime += d * 10;

cv.onload  = () => cv.hidden = 0;
cv.onerror = () => cv.hidden = 1;
au.onerror = () => { if (au.getAttribute('src')) say("Couldn't load this song. Check the link / file name (it should end in .mp3)."); };
au.ontimeupdate = au.onloadedmetadata = tick;
au.onended = () => load(shuf ? Math.random() * TRACKS.length | 0 : ti + 1, TRACKS.length > 1);
au.onplay = au.onpause = () => mw.classList.toggle('playing', !au.paused);
sk.oninput = () => {
  au.currentTime = sk.value / 100 * (au.duration || 0);
  tick();
};

$('#pp').onclick = () => {
  if (!au.getAttribute('src')) {
    if (!TRACKS[ti].url) say("Add this song's link in js/script.js (TRACKS), then refresh the page.");
    return;
  }
  if (au.paused) au.play().catch(() => say('Tap play again to start the music.')); else au.pause();
};
$('#rw').onclick = () => skip(-1);
$('#fw').onclick = () => skip(1);
$('#sh').onclick = e => e.currentTarget.classList.toggle('on', shuf ^= 1);
$('#rp').onclick = e => e.currentTarget.classList.toggle('on', au.loop = !au.loop);

// playlist button + picking a song
lb.onclick = () => {
  const open = list.hidden;
  list.hidden = !open;
  lb.setAttribute('aria-pressed', open);
};
list.onclick = e => {
  const li = e.target.closest('li');
  if (!li) return;
  load(+li.dataset.i, true);
  list.hidden = true;
  lb.setAttribute('aria-pressed', false);
};

load(0);
drag(mw);


/* ---------- envelope ---------- */
// tap 1 = open + things float out | tap 2 = read the A4 letter | leaving the letter closes the envelope again
const ew = $('#ew');
let step = 0;

function closeEnv() {
  step = 0;
  ew.classList.remove('open');
  document.querySelectorAll('.env .p').forEach(p => p.remove());
}

// hearts, butterflies and flowers floating out of the envelope
function burst() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  const env = $('.env'),
        room = Math.max(120, Math.min(300, env.getBoundingClientRect().top - 10));
  const KIND = [['💗', '💖', '🩷', '💜', '🤍'], ['🦋'], ['🌸', '🌷', '🌼', '🪻', '🌺']],
        CLS = ['hrt', 'bfl', 'flw'];

  for (let i = 0; i < 24; i++) {
    const k = [0, 1, 2, 0, 2, 0, 1][i % 7],
          p = document.createElement('i'),
          b = document.createElement('b');

    b.textContent = KIND[k][Math.random() * KIND[k].length | 0];
    b.className = CLS[k];
    p.className = 'p';
    p.append(b);
    p.style.fontSize = (k === 1 ? 24 + Math.random() * 8 : 15 + Math.random() * 13) + 'px';
    env.append(p);

    const rise = room * (.55 + Math.random() * .45),
          dx = (Math.random() - .5) * (k === 1 ? 170 : 110),
          x0 = (Math.random() - .5) * 34,
          sw = [12, 26, 16][k] * (.7 + Math.random() * .6),
          cyc = k === 1 ? 3 : 1.6,
          ph = Math.random() * 6.283,
          fall = k === 2 ? rise * .7 : 0,
          spin = (Math.random() < .5 ? -1 : 1) * (160 + Math.random() * 200),
          fr = [];

    for (let s = 0; s <= 40; s++) {
      const t = s / 40,
            e = 1 - (1 - t) ** 3,
            a = ph + t * cyc * 6.283;
      fr.push({
        offset: t,
        opacity: t < .1 ? t * 10 : t > .72 ? (1 - t) / .28 : 1,
        transform: `translate(${x0 + dx * e + sw * Math.sin(a) * Math.min(1, t * 3)}px,${-rise * e + fall * t * t}px) rotate(${k === 1 ? Math.cos(a) * 22 : k === 0 ? Math.sin(a) * 10 : spin * t}deg) scale(${Math.min(1, .2 + t * 4) * (t > .7 ? 1 - .25 * (t - .7) / .3 : 1)})`
      });
    }

    p.animate(fr, {
      duration: 3600 + Math.random() * 1800,
      delay: 650 + i * 80 + Math.random() * 250,
      fill: 'both'
    }).onfinish = () => p.remove();
  }
}

const tapEnv = () => {
  if (!step) {
    // 1st tap: open the envelope
    step = 1;
    ew.classList.add('open');
    burst();
  } else {
    // 2nd tap: show the letter, and close the envelope again after it is closed
    show(
      `<article class="a4"><h3>${LETTER.to}</h3><br>${LETTER.body.map(p => `<p>${p}</p>`).join('')}<p class="sg">— ${LETTER.from} 🌸</p></article>`,
      () => setTimeout(() => { if (!ov.classList.contains('show')) closeEnv(); }, 450)
    );
  }
};

drag(ew, tapEnv);
ew.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    if (ew.dataset.dock) ew._undock(); else tapEnv();
  }
});


/* ---------- calendar ---------- */
const MN = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
let Y = today.getFullYear(),
    M = today.getMonth();

const key = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

function draw() {
  $('#cm').textContent = `${MN[M]} ${Y}`;

  // weekday letters + empty cells before the 1st of the month
  let h = "SMTWTFS".split('').map(x => `<div class="wd">${x}</div>`).join('')
        + '<i></i>'.repeat(new Date(Y, M, 1).getDay());

  // one cell per day, each with a heart button
  for (let d = 1, n = new Date(Y, M + 1, 0).getDate(); d <= n; d++) {
    const k = key(Y, M, d);
    h += `<div class="d${k === key(today.getFullYear(), today.getMonth(), today.getDate()) ? ' t' : ''}">${d}<button class="h${PHOTOS[k] ? ' on' : ''}" data-k="${k}" aria-label="Photo for ${k}">♥</button></div>`;
  }
  $('#grid').innerHTML = h;
}

// « ‹ › » buttons: change month / year
document.querySelector('.nav').onclick = e => {
  const b = e.target.closest('[data-s]');
  if (!b) return;
  const n = Y * 12 + M + +b.dataset.s;
  Y = Math.floor(n / 12);
  M = n % 12;
  draw();
};

// tapping the month name jumps back to this month
$('#cm').onclick = () => {
  Y = today.getFullYear();
  M = today.getMonth();
  draw();
};

// tapping a heart opens that day's photo
$('#grid').onclick = e => {
  const b = e.target.closest('.h');
  if (!b) return;
  const k = b.dataset.k,
        p = PHOTOS[k] || {},
        src = p.src || PHOTO_FOLDER + k + '.jpg',
        [y, m, d] = k.split('-'),
        lbl = `${MN[m - 1]} ${+d}, ${y}`;
  show(`<div class="pc"><div class="ph"><span>📷 Photo for<br>${lbl}<br><small>${src}</small></span><img src="${src}" alt="Photo from ${lbl}" onerror="this.remove()"></div><p class="cap">${p.note || lbl}</p></div>`);
};

draw();


/* ---------- travel log: "our date map" ---------- */
const tripMap = $('#tripMap');

function renderTrip() {
  const n = PLACES.length;
  if (!n) {
    tripMap.innerHTML = '<p class="empty">Add your first date place in js/script.js (PLACES).</p>';
    tripMap.style.height = '';
    return;
  }

  const W = tripMap.clientWidth,
        ROW = 120,                                      // distance between two pins
        TOP = 72,                                       // where the first pin stands
        H = TOP + (n - 1) * ROW + 64,
        pts = PLACES.map((p, i) => [W * (i % 2 ? .74 : .26), TOP + i * ROW]);

  // the dotted road: a smooth S-curve from pin to pin
  const road = pts.map((p, i) => {
    if (!i) return `M${p[0]},${p[1]}`;
    const a = pts[i - 1];
    return `C${a[0]},${a[1] + ROW * .5} ${p[0]},${p[1] - ROW * .5} ${p[0]},${p[1]}`;
  }).join(' ');

  const blobs = pts.map((p, i) =>
    `<circle class="blob" cx="${p[0] + (i % 2 ? -34 : 34)}" cy="${p[1] - 20}" r="${W * .26}" fill="${['#e7dcfb', '#fbdbe8', '#dff3e8', '#fde9d4'][i % 4]}"/>`
  ).join('');

  const compass = `<g transform="translate(${W - 34} 34)"><circle class="compass-ring" r="16"/><path class="compass-needle" d="M0-11 4 0 0 11-4 0Z"/><text class="compass-n" y="-19">N</text></g>`;

  const stops = PLACES.map((p, i) => `
    <button class="stop ${i % 2 ? 'R' : 'L'}${p.next ? ' next' : ''}" style="left:${pts[i][0]}px; top:${pts[i][1]}px; --i:${i}" data-i="${i}" aria-label="${p.name}">
      <svg class="pin" viewBox="-20 -52 40 54"><path d="M0 0C-12-14-18-24-18-33a18 18 0 1 1 36 0C18-24 12-14 0 0Z"/><circle cy="-33" r="13"/></svg>
      <i class="emo">${p.next ? '?' : p.emoji || i + 1}</i>
      <span class="lbl"><b>${p.name}</b><small>${p.date || ''}</small></span>
    </button>`).join('');

  tripMap.style.height = H + 'px';
  tripMap.innerHTML = `<svg class="route-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${blobs}<path class="road-bg" d="${road}"/><path class="road" d="${road}"/>${compass}</svg>${stops}`;

  const visited = PLACES.filter(p => !p.next).length;
  $('#tripSub').textContent = `${visited} place${visited === 1 ? '' : 's'} we've been to together${visited < n ? ' · the next stop is waiting' : ''}`;
}

// tapping a pin opens the memory
tripMap.onclick = e => {
  const b = e.target.closest('.stop');
  if (!b) return;
  const i = +b.dataset.i,
        p = PLACES[i];
  show(`<div class="pc place"><div class="ph"><span><i class="big">${p.emoji || '📍'}</i>${p.photo ? '' : '<br><small>Add a photo in js/script.js</small>'}</span>${p.photo ? `<img src="${p.photo}" alt="${p.name}" onerror="this.remove()">` : ''}</div><p class="cap">${p.name}</p><p class="pdate">${p.next ? 'Next stop' : 'Stop ' + (i + 1)}${p.date ? ' · ' + p.date : ''}</p>${p.note ? `<p class="pnote">${p.note}</p>` : ''}</div>`);
};

renderTrip();

// the pins drop onto the map when you scroll to it
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries, ob) => entries.forEach(en => {
    if (en.isIntersecting) { tripMap.classList.add('go'); ob.disconnect(); }
  }), { threshold: .2 }).observe(tripMap);
} else {
  tripMap.classList.add('go');
}

let tripTimer;
addEventListener('resize', () => { clearTimeout(tripTimer); tripTimer = setTimeout(renderTrip, 150); });


/* ---------- instagram card when the mouse is over an avatar ---------- */
const IGLOGO = `<svg class="ig-logo" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="16.8" cy="7.2" r="1.1" fill="currentColor"/></svg>`;

document.querySelectorAll('.who[data-ig]').forEach(who => {
  const p = INSTAGRAM[who.dataset.ig];
  if (!p || !p.user) return;

  const img = who.querySelector('.av img'),
        stats = [['posts', p.posts], ['followers', p.followers], ['following', p.following]].filter(s => s[1]);

  who.insertAdjacentHTML('beforeend', `
    <div class="ig">
      <div class="ig-head">
        <span class="ig-ring"><span class="ig-pic">${p.name[0]}${img ? `<img src="${img.getAttribute('src')}" alt="" onerror="this.remove()">` : ''}</span></span>
        <div class="ig-id"><b>@${p.user}</b><small>${p.name}</small></div>
        ${IGLOGO}
      </div>
      ${stats.length ? `<div class="ig-stats">${stats.map(s => `<span><b>${s[1]}</b>${s[0]}</span>`).join('')}</div>` : ''}
      ${p.bio ? `<p>${p.bio}</p>` : ''}
      <a class="ig-btn" href="https://instagram.com/${p.user}" target="_blank" rel="noopener">View profile</a>
    </div>`);

  // phones have no hover: tap the avatar instead
  if (matchMedia('(hover:none)').matches) {
    who.addEventListener('click', e => { if (!e.target.closest('a')) who.classList.toggle('open'); });
  }
});
if (matchMedia('(hover:none)').matches) {
  document.addEventListener('click', e => {
    if (!e.target.closest('.who')) document.querySelectorAll('.who.open').forEach(w => w.classList.remove('open'));
  });
}


/* ---------- lavender wallpaper (little drawn cats, bows, stars) ---------- */
const CATG = `<g class="tail"><path d="M20 60Q2 58 8 38" fill="none" style="stroke-width:11"/><path d="M20 60Q2 58 8 38" fill="none" style="stroke:var(--c);stroke-width:4.5"/></g>
<ellipse class="c f1" cx="40" cy="78" rx="9" ry="6"/><ellipse class="c f2" cx="66" cy="78" rx="9" ry="6"/>
<ellipse class="c" cx="48" cy="58" rx="34" ry="21"/><ellipse class="m" cx="36" cy="52" rx="11" ry="8"/>
<path class="c" d="M54 46L58 21 75 33Q80 32 85 33L102 21 106 46Q108 68 80 69 52 68 54 46Z"/>
<ellipse class="e" cx="70" cy="50" rx="2.8" ry="3.2"/><ellipse class="e" cx="91" cy="50" rx="2.8" ry="3.2"/>
<ellipse class="k" cx="63" cy="58" rx="5" ry="3.5"/><ellipse class="k" cx="98" cy="58" rx="5" ry="3.5"/>
<path d="M76 56q2 3 4 0q2 3 4 0M56 52l-9-2M56 58l-9 3M104 52l9-2M104 58l9 3" fill="none" style="stroke-width:2.2"/>`;

// wallpaper pieces: at(x, y, size, rotation, shape)
const at = (x, y, s, r, g) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${g}</g>`;

const BC = `<g class="cat bgc" style="--c:#fff;--p:#e6dcf7">${CATG}</g>`;
const BOW = `<path d="M0 0C-8-9-20-8-19 1-18 9-8 6 0 1 8 6 18 9 19 1 20-8 8-9 0 0ZM-1 2L-8 14M1 2L8 14" fill="#f1eafc" stroke="#bfaae8" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/><circle cy="1" r="2.8" fill="#d9ccf4" stroke="#bfaae8" stroke-width="1.2"/>`;
const STAR = `<path d="M0-8L2.4-2.6 8-2.4 3.6 1.2 5 7 0 3.6-5 7-3.6 1.2-8-2.4-2.4-2.6Z" fill="#fff" stroke="#cdbdf0" stroke-linejoin="round"/>`;

document.body.insertAdjacentHTML('afterbegin',
  `<svg class="bg" aria-hidden="true"><defs><pattern id="pt" width="300" height="340" patternUnits="userSpaceOnUse">` +
  // small background cats
  at(24, 50, .55, 0, BC) + at(236, 196, '-.5 .5', 0, BC) + at(34, 268, .45, 0, BC) +
  // bows
  at(170, 50, 1, -12, BOW) + at(60, 178, 1, 14, BOW) + at(236, 300, .9, -8, BOW) + at(130, 250, .8, 10, BOW) +
  // stars
  at(250, 40, 1, 0, STAR) + at(128, 122, .9, 10, STAR) + at(276, 130, 1.2, 0, STAR) +
  at(16, 226, .8, 0, STAR) + at(160, 176, 1.6, 0, STAR) + at(118, 322, .8, 0, STAR) +
  // dots
  `<g fill="#d9cdf4"><circle cx="112" cy="26" r="4"/><circle cx="276" cy="88" r="3"/><circle cx="14" cy="130" r="5"/><circle cx="206" cy="120" r="3.5"/><circle cx="90" cy="214" r="3"/><circle cx="270" cy="262" r="4.5"/><circle cx="190" cy="318" r="3"/></g></pattern></defs><rect width="100%" height="100%" fill="url(#pt)"/></svg>`
);


/* ---------- cat stickers: a fixed, wobbling layer scattered over the whole background ---------- */
// white backgrounds vanish thanks to mix-blend-mode in style.css; if x.png is missing it tries x.jpg
const stk = document.createElement('div');
stk.id = 'stk';
stk.setAttribute('aria-hidden', 'true');
document.body.append(stk);

const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };   // steady "random" numbers

const pics = STICKER_FILES.map((file, i) => {
  const im = new Image();
  let tried = 0;
  im.className = 'st';
  im.alt = '';
  im.style.setProperty('--d', (3.2 + i % 4 * .45) + 's');
  im.style.setProperty('--l', (-i * .53) + 's');
  im.style.setProperty('--r', (rnd(i + 5) * 16 - 8) + 'deg');
  im.onerror = () => { if (tried++) { im.remove(); scatter(); } else im.src = 'stickers/' + file.replace(/\.\w+$/, '.jpg'); };
  im.src = 'stickers/' + file;
  stk.append(im);
  return im;
});

// spread the stickers over a loose grid that covers the screen (fewer on phones)
function scatter() {
  const W = innerWidth,
        H = innerHeight,
        phone = W < 760,
        ok = pics.filter(im => im.isConnected),
        n = phone ? Math.ceil(ok.length * .6) : ok.length,
        cols = Math.max(2, Math.round(Math.sqrt(n * W / H))),
        rows = Math.ceil(n / cols),
        cw = W / cols,
        ch = H / rows,
        cells = [...Array(cols * rows).keys()].sort((a, b) => rnd(a * 3 + 1) - rnd(b * 3 + 1)).slice(0, n);

  ok.forEach((im, i) => {
    im.style.display = i < n ? '' : 'none';
    if (i >= n) return;
    const cell = cells[i],
          cx = (cell % cols + .5 + (rnd(i * 2 + 1) - .5) * .5) * cw,
          cy = (Math.floor(cell / cols) + .5 + (rnd(i * 2 + 2) - .5) * .5) * ch,
          scale = STICKER_SIZE[STICKER_FILES[pics.indexOf(im)]] || 1;
    im.style.left = cx + 'px';
    im.style.top = cy + 'px';
    im.style.setProperty('--w', Math.max(56, Math.min(230, Math.min(cw, ch) * .8 * scale)) + 'px');
    im.style.opacity = !phone && Math.abs(cx - W / 2) < 250 ? .5 : .95;   // softer behind the middle of the page
  });
}
scatter();
addEventListener('resize', scatter);


/* ---------- monthsary / anniversary popup ---------- */
// ordinal numbers: 1st, 2nd, 3rd, 13th ...
const ord = n => { const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };

// is there a monthsary / anniversary today, or within the last (days - 1) days?
function celebration(date) {
  for (let back = 0; back < CELEBRATE.days; back++) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - back);
    if (d.getDate() !== START.getDate()) continue;
    const months = (d.getFullYear() - START.getFullYear()) * 12 + d.getMonth() - START.getMonth();
    if (months < 1) return null;
    return months % 12 === 0 ? { type: 'anniversary', n: months / 12 } : { type: 'monthsary', n: months };
  }
  return null;
}

let confetti = null;
function stopConfetti() {
  if (confetti) confetti.remove();
  confetti = null;
}
function startConfetti() {
  stopConfetti();
  confetti = document.createElement('div');
  confetti.className = 'confetti';
  const E = ['💗', '🌸', '✨', '🎀', '💜', '🦋', '💖', '⭐'];
  for (let i = 0; i < 46; i++) {
    const c = document.createElement('i');
    c.textContent = E[i % E.length];
    c.style.cssText = `left:${Math.random() * 100}%; font-size:${14 + Math.random() * 16}px; animation-duration:${3.5 + Math.random() * 3}s; animation-delay:${Math.random() * 3}s; --sway:${(Math.random() - .5) * 120}px; --spin:${(Math.random() - .5) * 720}deg`;
    confetti.append(c);
  }
  document.body.append(confetti);
}

function celebrate(c) {
  const anniv = c.type === 'anniversary',
        title = anniv ? CELEBRATE.anniversary : CELEBRATE.monthsary,
        unit = anniv ? 'year' : 'month',
        name = anniv ? 'anniversary' : 'monthsary';

  let k = 0;                                           // letters bounce one after another, words never split
  const words = title.split(' ').map(w => `<span class="word">${[...w].map(ch => `<span style="--i:${k++}">${ch}</span>`).join('')}</span>`).join(' ');

  show(`
    <div class="party">
      ${CELEBRATE.sticker ? `<img class="party-cat" src="stickers/${CELEBRATE.sticker}" alt="" onerror="this.remove()">` : ''}
      <div class="party-ribbon">${ord(c.n)} ${name}</div>
      <h2>${words}</h2>
      <p>${c.n} ${unit}${c.n > 1 ? 's' : ''} of loving each other</p>
      <div class="party-hearts"><i>💗</i><i>💖</i><i>💗</i></div>
      <small>Aurish &amp; Nick · ${days} days together</small>
    </div>`, stopConfetti);
  startConfetti();
}

function checkCelebration() {
  const demo = new URLSearchParams(location.search).get('celebrate');      // index.html?celebrate=anniversary
  const c = demo
    ? { type: demo === 'anniversary' ? 'anniversary' : 'monthsary', n: demo === 'anniversary' ? 1 : 3 }
    : celebration(today);
  if (c) celebrate(c);
}
setTimeout(checkCelebration, 900);


/* ---------- after midnight: new date, new day count, fresh calendar ---------- */
const msToMidnight = () => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1) - n + 500;
};
setTimeout(function midnight() {
  refreshToday();
  draw();
  checkCelebration();
  setTimeout(midnight, msToMidnight());
}, msToMidnight());
