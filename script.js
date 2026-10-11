const screens = [...document.querySelectorAll('.screen')];
const progressBar = document.getElementById('progressBar');
const toast = document.getElementById('toast');
let toastTimer;

function showScreen(id, progress) {
  screens.forEach(screen => {
    const active = screen.id === id;
    screen.hidden = !active;
    screen.classList.toggle('active', active);
  });
  progressBar.style.width = `${progress}%`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function say(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('showIt').addEventListener('click', () => showScreen('nudge', 20));
document.getElementById('okayYes').addEventListener('click', () => showScreen('story', 48));
document.getElementById('notYet').addEventListener('click', () => showScreen('nudge', 20));
document.getElementById('backButton').addEventListener('click', () => showScreen('welcome', 0));

const chapters = [
  { label:'The beginning', title:'From strangers to something special', icon:'✨', copy:'Somehow, two people who started out as strangers found their way into each other’s days. I didn’t know then how much your name would come to mean to me. I’m really glad our paths crossed.', art:'🌸　💌　🌸' },
  { label:'A friendship grows', title:'Then you became my person', icon:'🫶', copy:'First came the laughs, the little talks, and the comfort of having you around. Becoming friends with you felt easy—and getting closer felt like finding a place where I could just be myself.', art:'☁️　☀️　☁️' },
  { label:'Best-friend energy', title:'Friends, then best friends', icon:'💞', copy:'Somewhere along the way, you became my favorite person to tell things to, laugh with, and think about. You made ordinary days feel special just by being part of them.', art:'💬　🌷　💬' },
  { label:'A plot twist I adore', title:'I never thought we’d actually date…', icon:'🥹', copy:'And then, somehow, our friendship became something even sweeter. I never thought we’d end up together, but I’m so thankful we did. You’re my best friend and my love, all wrapped into one wonderful person.', art:'🎀　💗　🎀' },
  { label:'Our little memories', title:'Even Roblox became part of our story', icon:'🎮', copy:'I still smile thinking about when we used to play Roblox together. I know you can’t play anymore because of your parents’ rules, and I miss those little game nights—but the best part was always getting to spend time with you.', art:'🕹️　⭐　🌸' },
  { label:'The next chapters', title:'One day at a time, together', icon:'🌙', copy:'We’ve only met once so far, but that one meeting means so much to me. Inshallah, the future brings us more visits, more laughs, and a whole collection of memories we haven’t made yet. For now, I’m grateful for us—just as we are.', art:'🌙　🤍　✨' }
];
let currentChapter = 0;
const chapterTitle = document.getElementById('story-title');
const chapterLabel = document.getElementById('chapterLabel');
const chapterCopy = document.getElementById('storyCopy');
const chapterIcon = document.getElementById('storyIcon');
const memoryArt = document.getElementById('memoryArt');
const chapterCount = document.getElementById('chapterCount');
const dots = document.getElementById('dots');

function renderDots() {
  dots.replaceChildren(...chapters.map((_, index) => {
    const dot = document.createElement('span');
    dot.className = `dot${index === currentChapter ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Chapter ${index + 1}`);
    return dot;
  }));
}

function renderChapter() {
  const chapter = chapters[currentChapter];
  const card = document.getElementById('storyCard');
  card.classList.remove('replay');
  void card.offsetWidth;
  card.classList.add('replay');
  chapterTitle.textContent = chapter.title;
  chapterLabel.textContent = chapter.label;
  chapterCopy.textContent = chapter.copy;
  chapterIcon.textContent = chapter.icon;
  memoryArt.textContent = chapter.art;
  chapterCount.textContent = `Chapter ${currentChapter + 1} of ${chapters.length}`;
  document.getElementById('nextChapter').innerHTML = currentChapter === chapters.length - 1 ? 'One last note <span>→</span>' : 'Next memory <span>→</span>';
  progressBar.style.width = `${48 + ((currentChapter + 1) / chapters.length) * 37}%`;
  renderDots();
}

document.getElementById('nextChapter').addEventListener('click', () => {
  if (currentChapter < chapters.length - 1) {
    currentChapter++;
    renderChapter();
  } else {
    showScreen('final', 100);
    confetti();
  }
});

document.getElementById('restartStory').addEventListener('click', () => {
  currentChapter = 0;
  renderChapter();
  showScreen('story', 48);
});

document.getElementById('loveButton').addEventListener('click', event => {
  document.getElementById('loveResponse').textContent = 'Awww, I’m saving that in my heart. Thank you, cutie! 💗';
  event.currentTarget.textContent = 'Love received! 💌';
  confetti();
});

function confetti() {
  const colors = ['#f2a1b8', '#e4bad5', '#f7d79e', '#d884a0', '#fff'];
  for (let i = 0; i < 34; i++) {
    const bit = document.createElement('span');
    bit.textContent = Math.random() > .45 ? '♥' : '✦';
    bit.style.cssText = `position:fixed;z-index:10;left:${Math.random()*100}vw;top:-20px;color:${colors[i%colors.length]};font-size:${12+Math.random()*13}px;pointer-events:none;transition:transform ${1.5+Math.random()}s cubic-bezier(.2,.7,.3,1),opacity 1.8s ease`;
    document.body.append(bit);
    requestAnimationFrame(() => {
      bit.style.transform = `translate(${(Math.random()-.5)*150}px,${window.innerHeight+80}px) rotate(${Math.random()*540}deg)`;
      bit.style.opacity = '0';
    });
    setTimeout(() => bit.remove(), 3000);
  }
}

renderChapter();
