// =====================================================================
//   Aurish & Nick  -  js/script.js
// =====================================================================

const START = new Date(2025, 9, 13);   // anniversary 10/13/2025  (months start at 0, so 9 = October)
const $ = s => document.querySelector(s);

/* ---------- Anti-zooming ---------- */
const noZoom = e => e.preventDefault();

// double click / double tap
document.addEventListener('dblclick', noZoom, { passive: false });

// iOS Safari pinch gestures
['gesturestart', 'gesturechange', 'gestureend'].forEach(t =>
  document.addEventListener(t, noZoom, { passive: false })
);

// two-finger pinch on any touch screen
document.addEventListener('touchmove', e => {
  if (e.touches.length > 1 || (e.scale && e.scale !== 1)) e.preventDefault();
}, { passive: false });

// ctrl + mouse wheel / trackpad pinch (desktop)
addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });

// ctrl/cmd + plus / minus / zero (desktop)
addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && ['+', '-', '=', '_', '0'].includes(e.key)) e.preventDefault();
});


/* =====================================================================
   EDIT ME
   ===================================================================== */

// 1) MUSIC ------------------------------------------------------------
const TRACKS = [
  "2024-10-04": { src: "photos/2024-10-04.jpg", note: "When we were complete strangers" },
   "2025-09-29": { src: "photos/2025-09-29.jpg", note: "School science fair awarding" },
  "2025-10-02": { src: "photos/2025-10-02.jpg", note: "First lunch together" },
  "2025-10-14": { src: "photos/2025-10-14.jpg", note: "First hug" },
   "2025-10-09": { src: "photos/2025-10-09.jpg", note: "During division science fair" },
   "2025-10-08": { src: "photos/2025-10-08.jpg", note: "Became slightly clingy" },
 "2025-10-03": { src: "photos/2025-10-03.jpg", note: "Mcdo date" },
  "2025-11-13": { src: "photos/2025-11-13.jpg", note: "Mcdo date again hehe" },
   "2026-03-09": { src: "photos/2026-03-09.jpg", note: "During drama play idunno maybe" },
   "2026-03-06": { src: "photos/2026-03-06.jpg", note: "During training for her sports writing regional" },
    "2026-03-16": { src: "photos/2026-03-16.jpg", note: "Pic after her 5 day from RSPC" },
];

// 2) PHOTOS -----------------------------------------------------------
const PHOTO_FOLDER = "photos/";
const PHOTOS = {
  "2025-10-13": { src: "photos/2025-10-13.jpg", note: "The day it all began 💜" },
};

// 3) LETTER -----------------------------------------------------------
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
const INSTAGRAM = {
  aurish: { user: "mixed_in_the_stars02", name: "mixed_in_the_stars02", bio: "Cutie pie ✨", posts: "", followers: "", following: "" },
  nick:   { user: "nickcharlo",   name: "nickcharlo",   bio: "The one who made this ✨", posts: "", followers: "", following: "" }
};

// 6) CELEBRATION ------------------------------------------------------
// 6) CELEBRATION ------------------------------------------------------
const CELEBRATE = {
  days: 3,
  monthsary: "Happy Monthsary!",
  anniversary: "Happy Anniversary!",
  sticker: "2.png",
  voice: "voice/message.mp3",   // put your recording in a /voice folder (.mp3 or .m4a) or use a direct link
  voiceTitle: "Voice message",
  voiceHint: "Tap to play our special message"
};

/* ===================================================================== */


/* ---------- today + days counter ---------- */
let today, days;

function refreshToday() {
  const t = new Date();
  today = new Date(t.getFullYear(), t.getMonth(), t.getDate());
  days = Math.max(0, Math.round((today - START) / 864e5));
  $('#days').textContent = days;
}
refreshToday();


/* ---------- draggable widgets ---------- */
const PEEK = 34;

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

  const glide = (x, y) => {
    el.classList.add('glide');
    place(x, y);
    clearTimeout(el._g);
    el._g = setTimeout(() => el.classList.remove('glide'), 650);
  };

  const dock = side => {
    el.dataset.dock = side;
    el.classList.toggle('dock-l', side === 'L');
    el.classList.toggle('dock-r', side === 'R');
    glide(side === 'L' ? PEEK - el.offsetWidth : innerWidth - PEEK, el.offsetTop);
  };

  const undock = () => {
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

    const now = performance.now();
    vx = vx * .7 + (e.clientX - lx) / Math.max(1, now - lt) * 8 * .3;
    lx = e.clientX; lt = now;
    el.style.rotate = Math.max(-9, Math.min(9, vx * 3)) + 'deg';

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

    if (!mv) {
      if (el.dataset.dock) undock(); else if (onTap) onTap();
      return;
    }
    const w = el.offsetWidth,
          x = el.offsetLeft,
          out = Math.max(0, -x) + Math.max(0, x + w - innerWidth);
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

addEventListener('resize', () => document.querySelectorAll('.wg[data-dock]').forEach(w => {
  w.style.left = (w.dataset.dock === 'L' ? PEEK - w.offsetWidth : innerWidth - PEEK) + 'px';
}));


/* ---------- popup ---------- */
const ov = $('#ov'),
      box = $('#box');
let shownAt = 0,
    onHide = null;

const show = (h, cb) => {
  box.innerHTML = h + '<button class="x" aria-label="Close">×</button>';
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

ov.onclick = e => {
  if (Date.now() - shownAt > 500 && (e.target === ov || e.target.closest('.x'))) hide();
};
addEventListener('keydown', e => e.key === 'Escape' && hide());


/* ---------- music player ---------- */
const au = new Audio(),
      mw = $('#mw'),
      sk = $('#sk'),
      cv = $('#cv'),
      list = $('#list'),
      lb = $('#lb'),
      msg = $('#msg');
let ti = 0,
    shuf = 0;

au.loop = TRACKS.length === 1;
$('#rp').classList.toggle('on', au.loop);

const NOPE = /youtu\.?be|spotify\.com|soundcloud\.com|music\.apple\.com|deezer\.com/i;

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
  $('#hint').textContent = t.url ? '' : "Add this song's link in the playlist, then press play.";
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
const ew = $('#ew');
let step = 0;

function closeEnv() {
  step = 0;
  ew.classList.remove('open');
  document.querySelectorAll('.env .p').forEach(p => p.remove());
}

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
    step = 1;
    ew.classList.add('open');
    burst();
  } else {
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

const seen = {};
let gen = 0;

const hasPic = k => k in seen ? Promise.resolve(seen[k]) : new Promise(res => {
  if (PHOTOS[k]) return res(seen[k] = true);
  const im = new Image();
  im.onload = () => res(seen[k] = true);
  im.onerror = () => res(seen[k] = false);
  im.src = PHOTO_FOLDER + k + '.jpg';
});

const monthPics = (y, m) => Promise.all(
  Array.from({ length: new Date(y, m + 1, 0).getDate() }, (_, i) => hasPic(key(y, m, i + 1)))
).then(r => r.filter(Boolean).length);

const CAM = '<svg viewBox="0 0 24 24"><path d="M9 5 7.5 7H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2.5L15 5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

function setCount(c) {
  const el = $('#cnt');
  el.className = 'cnt show ' + (c ? 'pop' : 'none');
  el.innerHTML = CAM + '<span>' + (c ? `<b>${c}</b> picture${c === 1 ? '' : 's'} this month` : 'No pictures yet this month') + '</span>';
}

function draw() {
  const g = ++gen;
  $('#cm').textContent = `${MN[M]} ${Y}`;

  let h = "SMTWTFS".split('').map(x => `<div class="wd">${x}</div>`).join('')
        + '<i></i>'.repeat(new Date(Y, M, 1).getDay());

  const daysInMonth = new Date(Y, M + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const k = key(Y, M, d),
          known = PHOTOS[k] || seen[k];
    h += `<div class="d${k === key(today.getFullYear(), today.getMonth(), today.getDate()) ? ' t' : ''}${known ? ' has' : ''}" style="--n:${d}">${d}<button class="h${known ? ' on' : ''}" data-k="${k}" aria-label="Photo for ${k}">♥</button></div>`;
  }
  $('#grid').innerHTML = h;

  for (let d = 1; d <= daysInMonth; d++) {
    const k = key(Y, M, d);
    hasPic(k).then(ok => {
      if (!ok || g !== gen) return;
      const b = $('#grid').querySelector(`.h[data-k="${k}"]`);
      if (b) { b.classList.add('on'); b.parentNode.classList.add('has'); }
    });
  }
  monthPics(Y, M).then(c => { if (g === gen) setCount(c); });

  [-1, 1].forEach(step => {
    const t = Y * 12 + M + step,
          arrow = $(`.nav [data-s="${step}"]`);
    arrow.classList.remove('more');
    monthPics(Math.floor(t / 12), t % 12).then(c => { if (g === gen) arrow.classList.toggle('more', c > 0); });
  });
}

document.querySelector('.nav').onclick = e => {
  const b = e.target.closest('[data-s]');
  if (!b) return;
  const n = Y * 12 + M + +b.dataset.s;
  Y = Math.floor(n / 12);
  M = n % 12;
  draw();
};

$('#cm').onclick = () => {
  Y = today.getFullYear();
  M = today.getMonth();
  draw();
};

$('#grid').onclick = e => {
  const b = e.target.closest('.h');
  if (!b) return;
  const k = b.dataset.k,
        p = PHOTOS[k] || {},
        src = p.src || PHOTO_FOLDER + k + '.jpg',
        [y, m, d] = k.split('-'),
        lbl = `${MN[m - 1]} ${+d}, ${y}`;
  // <img class="pc-st"> is the heart sticker slot on the photo card (stickers/photo-heart.png)
  show(`<div class="pc"><img class="pc-st" src="stickers/photo-heart.png" alt="" onerror="this.remove()"><div class="ph"><span>📷 Photo for<br>${lbl}<br><small>${src}</small></span><img src="${src}" alt="Photo from ${lbl}" onerror="this.remove()"></div><p class="cap">${p.note || lbl}</p></div>`);
};

draw();


/* ---------- instagram card ---------- */
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

  const card = who.querySelector('.ig'),
        link = who.querySelector('.ig-btn');

  const fit = () => {
    const r = who.getBoundingClientRect(),
          cx = r.left + r.width / 2,
          half = card.offsetWidth / 2;
    let shift = 0;
    if (cx - half < 8) shift = 8 - (cx - half);
    else if (cx + half > innerWidth - 8) shift = innerWidth - 8 - (cx + half);
    card.style.setProperty('--shift', shift + 'px');
  };
  who.addEventListener('pointerenter', fit);
  who.addEventListener('focusin', fit);

  link.addEventListener('click', () => {
    who.classList.add('shut');
    who.classList.remove('open');
    link.blur();
  });
  who.addEventListener('pointerleave', () => who.classList.remove('shut'));

  if (matchMedia('(hover:none)').matches) {
    who.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      fit();
      who.classList.toggle('open');
    });
  }
});
if (matchMedia('(hover:none)').matches) {
  document.addEventListener('click', e => {
    if (!e.target.closest('.who')) document.querySelectorAll('.who.open').forEach(w => w.classList.remove('open'));
  });
}


/* ---------- monthsary / anniversary popup ---------- */
const ord = n => { const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };

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

/* ----- confetti: white dots + pink / lavender paper bits ----- */
let confetti = null;
function stopConfetti() {
  if (confetti) confetti.remove();
  confetti = null;
}
function startConfetti() {
  stopConfetti();
  confetti = document.createElement('div');
  confetti.className = 'confetti';

  const DOTS = ['#ffffff', '#ffffff', '#ffffff', '#ffe6f1'];
  const BITS = ['#ffffff', '#fbc9de', '#f59cc2', '#f3b6d6', '#d4c1f6', '#bda4ef', '#c9b6f3', '#a98be6'];
  const pick = a => a[Math.random() * a.length | 0];

  for (let i = 0; i < 72; i++) {
    const c = document.createElement('i'),
          dot = Math.random() < .34,
          w = dot ? 4 + Math.random() * 4 : 6 + Math.random() * 5,
          h = dot ? w : w * (1.5 + Math.random() * .8),
          dur = 4.5 + Math.random() * 4.5;

    c.className = dot ? 'dot' : 'bit';
    c.style.cssText =
      `left:${Math.random() * 100}%; width:${w}px; height:${h}px; background:${pick(dot ? DOTS : BITS)};` +
      `animation-duration:${dur}s, ${.8 + Math.random() * .9}s;` +
      `animation-delay:${-Math.random() * dur}s, ${-Math.random()}s;` +
      `--sway:${(Math.random() - .5) * 170}px; --spin:${(Math.random() < .5 ? -1 : 1) * (240 + Math.random() * 600)}deg`;
    confetti.append(c);
  }
  document.body.append(confetti);
}

/* ----- voice message player (inside the popup) ----- */
function setupVoice() {
  const vm = box.querySelector('.vm');
  if (!vm) return () => {};

  const hint = vm.querySelector('small'),
        idle = hint.textContent,
        url = CELEBRATE.voice,
        v = new Audio();
  let musicWasOn = false;

  v.preload = 'metadata';
  if (url && !NOPE.test(url)) v.src = direct(url);

  const resumeMusic = () => {
    if (musicWasOn) { musicWasOn = false; au.play().catch(() => {}); }
  };

  const tickV = () => {
    const d = v.duration, c = v.currentTime;
    hint.textContent = d ? `${f(c)} / ${f(d)}` : f(c);
    vm.style.setProperty('--p', (d ? c / d * 100 : 0) + '%');
  };

  v.ontimeupdate = v.onloadedmetadata = tickV;
  v.onplay  = () => vm.classList.add('playing', 'on');
  v.onpause = () => vm.classList.remove('playing');
  v.onended = () => {
    vm.classList.remove('on');
    vm.style.setProperty('--p', '0%');
    hint.textContent = idle;
    resumeMusic();
  };
  v.onerror = () => { if (v.getAttribute('src')) hint.textContent = "Couldn't load the voice file"; };

  vm.onclick = () => {
    if (!url) { hint.textContent = 'Add your file in CELEBRATE.voice'; return; }
    if (NOPE.test(url)) { hint.textContent = 'Use a direct .mp3 link'; return; }
    if (v.paused) {
      musicWasOn = musicWasOn || !au.paused;      // pause the song while the message plays
      au.pause();
      v.play().catch(() => { hint.textContent = 'Tap again to play'; });
    } else {
      v.pause();
    }
  };

  return () => { v.pause(); v.removeAttribute('src'); v.load(); resumeMusic(); };
}

/* ----- the popup ----- */
function celebrate(c) {
  const anniv = c.type === 'anniversary',
        title = anniv ? CELEBRATE.anniversary : CELEBRATE.monthsary,
        unit = anniv ? 'year' : 'month',
        name = anniv ? 'anniversary' : 'monthsary',
        vTitle = CELEBRATE.voiceTitle || 'Voice message',
        vHint = CELEBRATE.voiceHint || 'Tap to play our special message';

  let k = 0;
  const words = title.split(' ').map(w => `<span class="word">${[...w].map(ch => `<span style="--i:${k++}">${ch}</span>`).join('')}</span>`).join(' ');
  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-heart"/></svg>';

  let stopVoice = () => {};

  show(`
    <div class="party">
      ${CELEBRATE.sticker ? `<img class="party-cat" src="stickers/${CELEBRATE.sticker}" alt="" onerror="this.remove()">` : ''}
      <div class="party-ribbon">${ord(c.n)} ${name}</div>
      <h2>${words}</h2>
      <p>${c.n} ${unit}${c.n > 1 ? 's' : ''} of loving each other</p>

      <button class="vm" type="button" aria-label="Play voice message">
        <span class="vm-btn">
          <svg class="vm-pl" viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19"/></svg>
          <svg class="vm-pa" viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1.3"/><rect x="13.5" y="5" width="4" height="14" rx="1.3"/></svg>
        </span>
        <span class="vm-t"><b>${vTitle}</b><small>${vHint}</small></span>
        <span class="vm-bar"><i></i></span>
      </button>

      <div class="party-hearts">${heart}${heart}${heart}</div>
      <small class="party-foot">Aurish &amp; Nick · ${days} days together</small>
    </div>`,
    () => { stopConfetti(); stopVoice(); });

  stopVoice = setupVoice();
  startConfetti();
}

function checkCelebration() {
  const demo = new URLSearchParams(location.search).get('celebrate');
  const c = demo
    ? { type: demo === 'anniversary' ? 'anniversary' : 'monthsary', n: demo === 'anniversary' ? 1 : 3 }
    : celebration(today);
  if (c) celebrate(c);
}
setTimeout(checkCelebration, 900);


/* ---------- midnight refresh ---------- */
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


/* ---------- lively scenery ---------- */
(function scenery() {
  const bg = $('.bg-fixed');
  if (!bg) return;
  const r = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.random() * a.length | 0];

  // soft drifting colour clouds
  bg.insertAdjacentHTML('afterbegin',
    '<i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><i class="blob b4"></i>');

  // twinkling stardust (two layers that twinkle out of sync)
  const SC = ['#ffffff', '#ffffff', '#ffd6e8', '#f6b8d6', '#e2d3fb', '#cdb9f4'];
  const dust = () => Array.from({ length: 34 }, () =>
    `${r(0, 100).toFixed(1)}vw ${r(0, 100).toFixed(1)}vh 0 ${r(.2, 1.3).toFixed(1)}px ${pick(SC)}`).join(',');
  ['s1', 's2'].forEach(c =>
    bg.insertAdjacentHTML('beforeend', `<i class="stars ${c}" style="box-shadow:${dust()}"></i>`));

  // hearts, sparkles and bubbles floating upward
  const wrap = document.createElement('div');
  wrap.className = 'floaties';
  const FC = ['#ffffff', '#ffffff', '#f9bcd8', '#f08bb6', '#d9c6f7', '#b79df0', '#c9a8f2'];
  const N = innerWidth < 600 ? 16 : 26;

  for (let i = 0; i < N; i++) {
    const kind = ['h', 's', 'b', 'h', 's', 'b', 's'][i % 7],
          size = kind === 'b' ? r(8, 30) : r(11, 25),
          dur = r(16, 32),
          st = `left:${r(0, 100).toFixed(1)}%; width:${size.toFixed(1)}px; height:${size.toFixed(1)}px; color:${pick(FC)};` +
               `--dx:${r(-60, 60).toFixed(0)}px; --rot:${r(-90, 90).toFixed(0)}deg; --o:${r(.55, .95).toFixed(2)};` +
               `animation-duration:${dur.toFixed(1)}s, ${r(2, 4).toFixed(1)}s;` +
               `animation-delay:${(-r(0, dur)).toFixed(1)}s, ${(-r(0, 3)).toFixed(1)}s`;
    wrap.insertAdjacentHTML('beforeend', kind === 'b'
      ? `<span class="fl b" style="${st}"></span>`
      : `<svg class="fl ${kind}" style="${st}"><use href="#${kind === 'h' ? 'i-heart' : 'i-spark'}"/></svg>`);
  }
  bg.append(wrap);

  // little sparkles orbiting the days ring
  const hero = $('.hero');
  if (hero) hero.insertAdjacentHTML('beforeend',
    '<div class="orbit">' + [0, 120, 240].map((a, i) =>
      `<span class="o" style="rotate:${a}deg"><svg class="${i === 1 ? 'oh' : 'os'}"><use href="#${i === 1 ? 'i-heart' : 'i-spark'}"/></svg></span>`
    ).join('') + '</div>');
})();
