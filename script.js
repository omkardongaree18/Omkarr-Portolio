/* Typing effect */
(function(){
  const roles = [
    'AI/ML Enthusiast | Cloud & App Developer',
    'Building data‑driven solutions',
    'Flutter • Firebase • ASP.NET • SQL'
  ];
  const el = document.getElementById('typed');
  let roleIndex = 0, charIndex = 0, deleting = false;
  function tick(){
    const current = roles[roleIndex];
    if(!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true; setTimeout(tick, 1300); return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false; roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    const delay = deleting ? 26 : 58;
    setTimeout(tick, delay);
  }
  el.textContent = '';
  tick();
})();

/* Particles background */
(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h; const dpr = Math.min(devicePixelRatio || 1, 1.5); // lower DPR for smoother perf
  function resize(){ w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr; }
  addEventListener('resize', resize); resize();
  const dots = Array.from({length: innerWidth < 700 ? 50 : 80}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .25,
    r: 1.6 + Math.random() * 1.1
  }));
  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of dots){
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
    }
    // draw lines
    for(let i=0;i<dots.length;i++){
      for(let j=i+1;j<dots.length;j++){
        const a = dots[i], b = dots[j];
        const dx = a.x-b.x, dy = a.y-b.y; const dist = Math.hypot(dx,dy);
        if(dist < 100 * dpr){
          const alpha = 1 - dist/(100*dpr);
          ctx.strokeStyle = `rgba(110,231,255,${alpha*0.25})`;
          ctx.lineWidth = 1 * dpr * alpha;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // draw dots
    for(const p of dots){
      ctx.fillStyle = 'rgba(155,140,255,.9)';
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

/* Reveal on scroll */
(function(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{ if(e.isIntersecting){ e.target.classList.add('revealed'); }});
  }, {threshold:.14});
  document.querySelectorAll('.reveal, .time-item, .list .reveal').forEach(el=>observer.observe(el));
})();

/* Theme toggle */
document.getElementById('themeToggle').addEventListener('click',()=>{
  const dark = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  if(!dark){
    document.documentElement.style.setProperty('--bg','#f7f8fb');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--txt','#0b1220');
    document.documentElement.style.setProperty('--muted','#40506e');
  } else {
    document.documentElement.style.setProperty('--bg','#0b1220');
    document.documentElement.style.setProperty('--panel','#0f1629');
    document.documentElement.style.setProperty('--txt','#e6ecff');
    document.documentElement.style.setProperty('--muted','#a3b1d1');
  }
});

/* Footer year */
document.getElementById('year').textContent = new Date().getFullYear();

/* Stats counter */
(function(){
  const nums = document.querySelectorAll('.about-stats .num');
  if(!nums.length) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(!e.isIntersecting) return;
      const el = e.target; const end = parseFloat(el.dataset.count);
      let cur = 0; const step = end/50; // ~0.9s
      const inc = ()=>{ cur += step; if(cur >= end){ el.textContent = end; } else { el.textContent = (end%1===0? Math.round(cur) : cur.toFixed(2)); requestAnimationFrame(inc);} };
      inc(); obs.unobserve(el);
    });
  },{threshold:.3});
  nums.forEach(n=>obs.observe(n));
})();

/* Skill bars animation */
(function(){
  const bars = document.querySelectorAll('.skill');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(e.isIntersecting){
        const level = e.target.dataset.level;
        const fill = e.target.querySelector('.fill');
        fill.style.transition = 'width .8s ease';
        fill.style.width = level + '%';
        obs.unobserve(e.target);
      }
    });
  },{threshold:.5});
  bars.forEach(b=>obs.observe(b));
})();

/* Circular skill percent */
(function(){
  const circles = document.querySelectorAll('.circle');
  if(!circles.length) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach((e)=>{
      if(!e.isIntersecting) return;
      const pct = e.target.dataset.pct;
      const deg = Math.round(pct*3.6);
      e.target.style.background = `conic-gradient(var(--accent) ${deg}deg, rgba(255,255,255,.08) ${deg}deg)`;
      obs.unobserve(e.target);
    });
  },{threshold:.4});
  circles.forEach(c=>obs.observe(c));
})();

/* Lightweight form handler */
document.getElementById('contactForm')?.addEventListener('submit',async (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim();
  // Try to open Gmail compose in a new tab
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=dongareomkar1618@gmail.com&su=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(message)}`;
  try{
    const win = window.open(gmail,'_blank','noopener');
    if(!win){ location.href = `mailto:dongareomkar1618@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(message)}`; }
  }catch{
    location.href = `mailto:dongareomkar1618@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + name)}&body=${encodeURIComponent(message)}`;
  }
});

/* Tilt hover */
(function(){
  const cards = document.querySelectorAll('.tilt');
  const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches;
  if(isTouch){ return; }
  cards.forEach(card=>{
    card.addEventListener('mousemove',(e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      card.style.transform = `rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform = ''; });
  });
})();

/* Back to top and copy email */
(function(){
  const btn = document.getElementById('backTop');
  addEventListener('scroll',()=>{ btn.classList.toggle('show', scrollY>400); });
  btn.addEventListener('click',()=>{ scrollTo({top:0,behavior:'smooth'}); });
  const copyBtn = document.getElementById('copyEmail');
  if(copyBtn){ copyBtn.addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText('dongareomkar1618@gmail.com'); copyBtn.textContent='Copied!'; setTimeout(()=>copyBtn.textContent='Copy Email',1200);}catch(e){ location.href='mailto:dongareomkar1618@gmail.com'; }
  });}
})();


