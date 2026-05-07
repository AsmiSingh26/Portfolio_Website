const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.project-card,.skill-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.width='18px';cur.style.height='18px';cur.style.opacity='.6';});
  el.addEventListener('mouseleave',()=>{cur.style.width='10px';cur.style.height='10px';cur.style.opacity='1';});
});

// SCROLL PROGRESS
const prog=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const p=window.scrollY/(document.body.scrollHeight-window.innerHeight);
  prog.style.width=(p*100)+'%';
});

// PARTICLES
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
let W,H,particles=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
class P{
  constructor(){this.reset();}
  reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.r=Math.random()*1.4+.3;this.a=Math.random()*.5+.1;this.vx=(Math.random()-.5)*.18;this.vy=(Math.random()-.5)*.18;this.f=Math.random()*Math.PI*2;this.fs=Math.random()*.025+.005;}
  update(){this.x+=this.vx;this.y+=this.vy;this.f+=this.fs;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();}
  draw(){const a=this.a*(0.6+0.4*Math.sin(this.f));ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,136,${a})`;ctx.fill();}
}
for(let i=0;i<130;i++)particles.push(new P());

// MOUSE PARALLAX on particles
let pax=0,pay=0;
document.addEventListener('mousemove',e=>{pax=(e.clientX/W-.5)*.4;pay=(e.clientY/H-.5)*.4;});

function loop(){
  ctx.clearRect(0,0,W,H);
  ctx.save();ctx.translate(pax*8,pay*8);
  particles.forEach(p=>{p.update();p.draw();});
  ctx.restore();
  requestAnimationFrame(loop);
}
loop();

// TYPING
const roles=['A CSE Student',
  'A Web Development Enthusiast',
  'A Problem Solver',
  'An Aspiring Software Engineer'
];
let ri=0,ci=0,del=false;
const tel=document.getElementById('typed');
function type(){
  const cur=roles[ri];
  if(!del){tel.textContent=cur.slice(0,ci+1);ci++;if(ci===cur.length){del=true;setTimeout(type,1800);return;}setTimeout(type,65);}
  else{tel.textContent=cur.slice(0,ci-1);ci--;if(ci===0){del=false;ri=(ri+1)%roles.length;}setTimeout(type,35);}
}
type();

// SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{observer.observe(el);});

// COUNT UP
function countUp(el,target){
  let v=0;const step=target/60;
  const t=setInterval(()=>{v+=step;if(v>=target){el.textContent=target+'+';clearInterval(t);}else{el.textContent=Math.floor(v)+(target===100?'%':'+');}},24);
}
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){const t=+e.target.dataset.count;countUp(e.target,t);countObs.unobserve(e.target);}});
},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObs.observe(el));

// NAV ACTIVE
const secs=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-140)cur=s.id;});
  navAs.forEach(a=>{a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
});

// PARALLAX on hero avatar
const heroRight=document.querySelector('.hero-right');
window.addEventListener('mousemove',e=>{
  if(!heroRight)return;
  const rx=(e.clientX/window.innerWidth-.5)*14;
  const ry=(e.clientY/window.innerHeight-.5)*10;
  heroRight.style.transform=`translate(${rx}px,${ry}px)`;
});