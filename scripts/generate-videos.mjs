import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SCENES = [
  {
    id: '01-sueldo-2500',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '2,500',
    descuento: '315.50',
    neto: '2,184.50',
    hook: 'Te prometieron S/ 2,500 en planilla pero a tu banco llega esto 🤯',
    cta: '¿Te ha pasado? Comenta tu caso',
    likes: 1240,
    comentarios: 87,
    hashtags: ['#SueldoNeto', '#PlanillaPeru', '#fbperu'],
  },
  {
    id: '02-gratificacion-1800',
    tipo: 'gratif',
    tab: 'Gratificaci\u00f3n',
    sueldo: '1,800',
    bonif: '972.00',
    total: '11,772.00',
    hook: 'Tu gratificaci\u00f3n de S/ 1,800 ya no es un misterio 🎁',
    cta: 'Gu\u00e1rdalo para diciembre',
    likes: 1983,
    comentarios: 132,
    hashtags: ['#Gratificacion', '#FiestasPatrias', '#NavidadPeru'],
  },
  {
    id: '03-quinta-categoria-4000',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '4,000',
    descuento: '504.80',
    neto: '3,495.20',
    hook: 'Ganas S/ 4,000 y la SUNAT te retiene 5ta categor\u00eda 🤐',
    cta: 'Aprende a calcular tu retenci\u00f3n',
    likes: 1520,
    comentarios: 98,
    hashtags: ['#QuintaCategoria', '#SUNAT', '#ImpuestoRenta'],
  },
  {
    id: '04-onp-vs-afp-2000',
    tipo: 'comparar',
    tab: 'Sueldo Neto',
    sueldo: '2,000',
    label1: 'ONP (13%)',
    valor1: '1,740.00',
    label2: 'AFP',
    valor2: '1,747.60',
    hook: 'ONP vs AFP con S/ 2,000 \u2014 la diferencia te sorprende 👀',
    cta: 'Prueba los dos gratis',
    likes: 3470,
    comentarios: 251,
    hashtags: ['#ONP', '#AFP', '#PensionesPeru'],
  },
  {
    id: '05-cts-2200',
    tipo: 'cts',
    tab: 'CTS',
    sueldo: '2,200',
    cts: '2,200.00',
    interes: '82.50',
    hook: 'Tu CTS est\u00e1 durmiendo y podr\u00eda darte S/ 82.50 😳',
    cta: 'Mueve tu CTS a un banco que pague',
    likes: 2210,
    comentarios: 176,
    hashtags: ['#CTS', '#CompensacionTiempoServicio', '#Ahorro'],
  },
  {
    id: '06-rmv-1025',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '1,025',
    descuento: '129.36',
    neto: '895.64',
    hook: 'El sueldo m\u00ednimo S/ 1,025 \u2014 incluso as\u00ed descuentan ⚡',
    cta: 'Cu\u00e1nto te queda a ti?',
    likes: 5390,
    comentarios: 412,
    hashtags: ['#SueldoMinimo', '#RMV', '#Peru2026'],
  },
  {
    id: '07-horas-extras-2500',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '2,500',
    descuento: '315.50',
    neto: '2,184.50',
    hook: 'S/ 500 de horas extras \u2192 pagan AFP pero NO gratificaci\u00f3n 🤔',
    cta: 'Simula tus horas extra',
    likes: 1670,
    comentarios: 95,
    hashtags: ['#HorasExtras', '#SueldoBruto', '#EmpleoPeru'],
  },
  {
    id: '08-contador-3500',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '3,500',
    descuento: '441.70',
    neto: '3,058.30',
    hook: 'Contador/a con S/ 3,500 \u2014 esto te retiene el estado 🧾',
    cta: 'Manda esto a tu equipo',
    likes: 980,
    comentarios: 61,
    hashtags: ['#ContabilidadPeru', '#Contador', '#ProfesionalesPeru'],
  },
  {
    id: '09-sueldo-gross-5000',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '5,000',
    descuento: '669.67',
    neto: '4,330.33',
    hook: '\u201cGano S/ 5,000\u201d \u2026 pero en el banco caen S/ 4,330 💀',
    cta: 'Nunca negocies sin calcular',
    likes: 4120,
    comentarios: 289,
    hashtags: ['#SueldoGross', '#NegociacionSalarial', '#SueldoNeto'],
  },
  {
    id: '10-calculadora-rapida-2800',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '2,800',
    descuento: '353.36',
    neto: '2,446.64',
    hook: 'Tu sueldo neto en \u00a01 segundo! Sin registros ni nada 🚀',
    cta: 'Gu\u00e1rdalo y pru\u00e9balo',
    likes: 7850,
    comentarios: 534,
    hashtags: ['#CalculadoraPeru', '#HerramientaGratis', '#viral'],
  },
];

const CSS = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
body {
  background: #000;
  overflow: hidden;
}
.scene { position: relative; width: 100vw; height: 100vh; background: #0F172A; overflow: hidden; }

/* ---- Barra superior TikTok ---- */
.topbar {
  position: absolute; top: 0; left: 0; right: 0;
  z-index: 20; padding: 14px 12px 20px;
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,.45), transparent);
  color: #fff; font-family: 'Inter', system-ui, sans-serif;
  opacity: 0;
}
#app.run .topbar { opacity: 1; animation: animFade .4s ease .4s both; }
.follow { font-size: 13px; font-weight: 600; margin-right: 4px; opacity: .85; }
.foryou { font-size: 15px; font-weight: 800; border-bottom: 2px solid #fff; padding-bottom: 2px; }
.topicons { display: flex; gap: 10px; }
.topicons div { width: 14px; height: 14px; border-radius: 4px; border: 1.5px solid #fff; position: relative; }

/* ---- Calculadora (promo de pantalla) ---- */
.calc { position: absolute; inset: 0; padding: 70px 18px 180px; z-index: 5; font-family: 'Inter', system-ui, sans-serif; display: flex; flex-direction: column; }
.ctab-brand { display: flex; align-items: center; justify-content: center; gap: 8px; color: #fff; font-weight: 800; font-size: 15px; letter-spacing: .3px; opacity: 0; margin-bottom: 18px; }
#app.run .ctab-brand { opacity: 1; animation: animFade .3s ease .5s both; }
.ctab-brand .dot { width: 14px; height: 14px; border-radius: 50%; background: #059669; box-shadow: 0 0 14px #059669; }
.iphone { background: #1E293B; border-radius: 24px; padding: 22px 20px; box-shadow: 0 20px 50px rgba(0,0,0,.5); opacity: 0; transform: translateY(20px); }
#app.run .iphone { opacity: 1; animation: animUp .45s ease 1s both; }
.label { color: #7c8aa5; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; }
.val { color: #fff; font-size: 56px; font-weight: 900; margin-top: 6px; font-variant-numeric: tabular-nums; display: flex; }
.val .cur { color: #7c8aa5; font-size: 30px; font-weight: 800; margin-right: 8px; align-self: flex-start; margin-top: 8px; }
.val .caret { width: 4px; height: 42px; background: #059669; margin-left: 6px; align-self: center; }
#app.run .val .caret { animation: blink .7s steps(1) 0s 4; }
@keyframes blink { 50% { opacity: 0; } }
.status { color: #7c8aa5; font-size: 13px; margin-top: 14px; opacity: 0; }
#app.run .status { opacity: 1; animation: animFade .3s ease 2.4s both; }
.status .spin { display: inline-block; }
#app.run .status .spin { animation: rotate .9s linear infinite; }
@keyframes rotate { to { transform: rotate(360deg); } }
.row { display: flex; justify-content: space-between; color: #cbd5e1; font-size: 14px; margin-top: 16px; font-variant-numeric: tabular-nums; opacity: 0; }
#app.run .row { opacity: 1; animation: animFade .3s ease 3.2s both; }
.row b { color: #fff; }
.res { margin-top: 14px; background: linear-gradient(135deg, #059669, #047857); border-radius: 22px; padding: 20px; position: relative; opacity: 0; transform: scale(.9); }
#app.run .res { opacity: 1; animation: resPop .5s cubic-bezier(.175,.885,.32,1.4) 3.8s both; }
@keyframes resPop { 0% { opacity: 0; transform: scale(.85); } 70% { transform: scale(1.03); } 100% { opacity: 1; transform: scale(1); } }
.res .rl { color: rgba(255,255,255,.85); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; }
.res .rv { color: #fff; font-size: 52px; font-weight: 900; margin-top: 4px; font-variant-numeric: tabular-nums; }
.res .badge { position: absolute; top: -10px; right: 14px; background: #F59E0B; color: #0F172A; font-size: 11px; font-weight: 900; padding: 5px 10px; border-radius: 20px; transform: rotate(5deg); }
.spacer { flex: 1; }

/* ---- Columna de acciones TikTok (derecha) ---- */
.rail { position: absolute; right: 10px; bottom: 210px; z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 18px; opacity: 0; font-family: 'Inter', system-ui; }
#app.run .rail { opacity: 1; animation: animUp .4s ease 4.2s both; }
.av { width: 46px; height: 46px; border-radius: 50%; border: 2px solid #fff; background: linear-gradient(135deg,#1E3A8A,#059669); display: flex; align-items: center; justify-content: center; position: relative; }
.av .plus { position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); width: 17px; height: 17px; border-radius: 50%; background: #FE2C55; color: #fff; font-size: 11px; font-weight: 900; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,.4); }
.abtn { display: flex; flex-direction: column; align-items: center; color: #fff; font-size: 10px; font-weight: 600; gap: 3px; }
.abtn .ic { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; filter: drop-shadow(0 2px 4px rgba(0,0,0,.5)); }
.abtn .ic svg { width: 30px; height: 30px; fill: #fff; }
.heart .ic svg { fill: #fff; transition: fill .2s; }
#app.run .heart .ic svg { animation: heartBeat 1s ease 4.6s 2; }
@keyframes heartBeat { 0%,100% { transform: scale(1); } 30% { transform: scale(1.35); fill: #FE2C55; } 60% { transform: scale(1); } }
.disc { width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg,#1E3A8A,#059669); display: flex; align-items: center; justify-content: center; margin-top: 8px; }
.disc .dd { width: 20px; height: 20px; border-radius: 50%; background: #0F172A; }
#app.run .disc { animation: rotate 4s linear infinite 5s; }

/* ---- Caption (izquierda abajo) ---- */
.caption { position: absolute; left: 14px; right: 78px; bottom: 150px; z-index: 20; color: #fff; font-family: 'Inter', system-ui, sans-serif; opacity: 0; transform: translateY(14px); }
#app.run .caption { opacity: 1; animation: animUp .5s ease 5.6s both; }
.caption .user { font-size: 15px; font-weight: 800; margin-bottom: 8px; }
.caption .cap { font-size: 15px; line-height: 1.45; font-weight: 500; text-shadow: 0 1px 4px rgba(0,0,0,.6); }
.caption .tags { margin-top: 6px; font-weight: 700; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,.6); }
.caption .music { display: flex; align-items: center; gap: 7px; margin-top: 10px; font-size: 13px; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,.6); }
.caption .music .note { font-size: 16px; }

/* ---- Nav inferior TikTok ---- */
.navbottom { position: absolute; bottom: 0; left: 0; right: 0; z-index: 20; height: 60px; background: rgba(6,8,16,.92); display: flex; align-items: center; justify-content: space-around; color: #fff; font-family: 'Inter', system-ui, sans-serif; opacity: 0; }
#app.run .navbottom { opacity: 1; animation: animUp .4s ease 4s both; }
.nb { display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 9px; font-weight: 600; opacity: .9; }
.nb .ni { width: 20px; height: 20px; }
.nb.mid { position: relative; }
.nb.mid .ni { width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(135deg,#1E3A8A,#059669); position: relative; margin-top: -18px; }
.nb.mid .ni::after { content: '+'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800; }

/* ---- Finger ojo ---- */
.finger { position: absolute; z-index: 30; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.25); border: 2px solid rgba(255,255,255,.6); opacity: 0; }
.finger::after { content: ''; position: absolute; top: 50%; left: 50%; width: 18px; height: 18px; border-radius: 50%; transform: translate(-50%,-50%); background: radial-gradient(circle at 35% 35%, #fff, #b7c0d1); }
#app.run .finger { animation: tap 2.6s ease 1s both; }
@keyframes tap {
  0% { opacity: 0; }
  10% { opacity: 1; transform: translate(0,0); }
  40% { opacity: 1; transform: translate(0,0); }
  45% { opacity: .4; transform: translate(0,6px); }
  55% { opacity: 1; transform: translate(0,0); }
  70% { opacity: 0; transform: translate(-120px, 40px); }
  100% { opacity: 0; }
}

/* ---- Overlays de engagement ---- */
.eng { position: absolute; left: 14px; top: 30%; z-index: 25; color: #fff; font-family: 'Inter', system-ui, sans-serif; opacity: 0; transform: translateX(-30px); }
#app.run .eng { opacity: 1; animation: engIn .35s ease 5.2s both; }
@keyframes engIn { to { opacity: 1; transform: translateX(0); } }
.eng .eav { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#FB2C55,#B818B8); border: 2px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,.4); }
.eng .etxt { margin-top: 5px; font-size: 12px; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,.6); }

/* ---- Anims base ---- */
@keyframes animFade { from { opacity: 0; } }
@keyframes animUp { from { opacity: 0; transform: translateY(16px); } }
`;

const SVGS = {
  heart: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  comment: `<svg viewBox="0 0 24 24"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.13.99 4.1 2.64 5.59-.1.79-.38 1.92-.96 3.03 2.19-.45 3.89-1.42 4.72-2.15 1.11.35 2.36.53 3.6.53 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/></svg>`,
  share: `<svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3l9-8z"/></svg>`,
  discover: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.15 12.15L9.5 9.5l4.7-2.65 2.65 4.65-4.7 2.65z"/></svg>`,
  inbox: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>`,
  profile: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
  live: `<svg viewBox="0 0 24 24"><path d="M3 3v18h18V3H3zm6 14H7v-2H5v-2h2v-2h2v6zm8 0h-2v-2h-2v-2h2v-2h2v6z" opacity=".5" fill="#FF3040"/><path d="M2 5h2v2H2zM4 7h2v2H4zM2 9h2v2H2z" fill="#FE2C55"/></svg>`,
  search: `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
};

function sceneJS(s) {
  const dv = s.tipo === 'neto' ? s.neto : s.tipo === 'gratif' ? s.total : s.tipo === 'cts' ? s.cts : s.valor1;
  const target = parseFloat(dv.replace(',', ''));
  const mkTicker = (id) => `
  const tv = document.getElementById('${id}');
  const base = ${s.likes};
  let tn = base;
  function tick() { tn += Math.round(Math.random()*3); tv.textContent = tn >= 1000 ? (tn/1000).toFixed(1)+'K' : String(tn); }
  setInterval(tick, 900); tick();`;
  const mkViewer = (id) => `
  const vv = document.getElementById('${id}');
  const vbase = 4851; let vn = vbase;
  function vick() { vn += Math.round(Math.random()*5); vv.textContent = String(vn); }
  setInterval(vick, 700); vick();`;
  return `
const app = document.getElementById('app');
const DU = 13000;
function countUp(id, val, delay) {
  const el = document.getElementById(id);
  const dur = 1500; let t0 = null;
  function step(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (val * e).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
    if (p < 1) requestAnimationFrame(step);
  }
  setTimeout(() => requestAnimationFrame(step), delay);
}
function play() {
  app.classList.add('run');
  countUp('rv', ${target}, 3950);
  ${s.tipo === 'comparar' ? `countUp('rv2', ${parseFloat(s.valor2.replace(',', ''))}, 4200);` : ''}
  ${mkTicker('likes')}
  ${mkViewer('views')}
}
function restart() {
  app.classList.remove('run');
  void app.offsetWidth;
  setTimeout(() => { const e = document.getElementById('rv'); if (e) e.textContent = '0.00'; }, 120);
  setTimeout(play, 220);
}
window.addEventListener('load', play);
setInterval(restart, DU);
`;
}

function renderScene(s) {
  const isComparar = s.tipo === 'comparar';
  const isGratif = s.tipo === 'gratif';
  const isCts = s.tipo === 'cts';
  const tagsStr = s.hashtags.map((h) => '#' + h.replace('#', '')).join(' ');

  const calcBody = isComparar
    ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px">
      <div style="background:#0F172A;border-radius:16px;padding:14px;text-align:center">
        <div style="color:#7c8aa5;font-size:11px;font-weight:700">${s.label1}</div>
        <div style="color:#fff;font-size:30px;font-weight:900;margin-top:4px;font-variant-numeric:tabular-nums">${s.valor1}</div>
      </div>
      <div style="background:linear-gradient(135deg,#059669,#047857);border-radius:16px;padding:14px;text-align:center">
        <div style="color:rgba(255,255,255,.8);font-size:11px;font-weight:700">${s.label2}</div>
        <div id="rv2" style="color:#fff;font-size:30px;font-weight:900;margin-top:4px;font-variant-numeric:tabular-nums">0.00</div>
      </div>
    </div>`
    : isGratif || isCts
      ? `
    <div class="row"><span>${isCts ? 'Semestre' : 'Bonificaci\u00f3n EsSalud 9%'}</span><b>${isCts ? 'S/ 1,100.00' : '+ S/ ' + s.bonif}</b></div>
    <div class="res">
      <div class="rl">${isCts ? 'CTS a Depositar' : 'Gratificaci\u00f3n Total'}</div>
      <div class="rv" id="rv">0.00</div>
      ${isCts ? `<div class="badge">+S/ ${s.interes} inter\u00e9s</div>` : ''}
    </div>`
      : `
    <div class="row"><span>Descuento pensi\u00f3n</span><b>- S/ ${s.descuento}</b></div>
    <div class="res">
      <div class="rl">Sueldo Neto</div>
      <div class="rv" id="rv">0.00</div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${s.hook.slice(0, 40)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
${CSS}
</style>
</head>
<body>
<div class="scene" id="app">

  <div class="topbar">
    <div style="display:flex;align-items:center;gap:10px">
      <span class="follow">Siguiendo</span>
      <span class="foryou">Para ti</span>
    </div>
    <div class="topicons">
      <div style="display:flex;align-items:center;justify-content:center">${SVGS.live}</div>
      <div style="display:flex;align-items:center;justify-content:center">${SVGS.search}</div>
    </div>
  </div>

  <div class="calc">
    <div class="ctab-brand"><span class="dot"></span> Calculadoras Laborales Per\u00fa</div>
    <div class="iphone">
      <div class="label">Sueldo Bruto Mensual</div>
      <div class="val"><span class="cur">S/</span>${s.sueldo}<span class="caret"></span></div>
      <div class="status"><span class="spin">&#8635;</span>&nbsp; Calculando AFP + 5ta categor\u00eda...</div>
      ${calcBody}
    </div>
    <div class="spacer"></div>
    <div style="text-align:center;color:rgba(255,255,255,.25);font-size:12px;font-family:Inter,sans-serif">calculadoras-laborales-peru.vercel.app</div>
  </div>

  <div class="finger" id="finger"></div>

  <div class="rail">
    <div class="av"><span style="font-size:26px;font-weight:900;color:#fff">N</span><span class="plus">+</span></div>
    <div class="abtn heart"><span class="ic">${SVGS.heart}</span><span id="likes">1.2K</span></div>
    <div class="abtn"><span class="ic">${SVGS.comment}</span><span>${s.comentarios}</span></div>
    <div class="abtn"><span class="ic">${SVGS.share}</span><span>Compartir</span></div>
    <div class="disc"><div class="dd"></div></div>
  </div>

  <div class="eng">
    <div class="eav" style="background:linear-gradient(135deg,#FB2C55,#B818B8)"></div>
    <div class="etxt">a"gracias por esto"</div>
  </div>

  <div class="caption">
    <div class="user">@calculadoras.pe \u00b7 <span style="opacity:.8;font-weight:500">3 h</span></div>
    <div class="cap">${s.hook}</div>
    <div class="tags">${tagsStr}</div>
    <div class="music"><span class="note">&#9835;</span> sonido original - @calculadoras.pe</div>
  </div>

  <div class="navbottom">
    <div class="nb"><span class="ni">${SVGS.home}</span>Inicio</div>
    <div class="nb"><span class="ni">${SVGS.discover}</span>Descubrir</div>
    <div class="nb mid"><span class="ni"></span>A\u00f1adir</div>
    <div class="nb"><span class="ni">${SVGS.inbox}</span>Bandeja</div>
    <div class="nb"><span class="ni">${SVGS.profile}</span>Perfil</div>
  </div>

  <div style="position:absolute;bottom:64px;left:14px;z-index:15;color:#fff;font-family:Inter,sans-serif;font-size:12px;font-weight:600;opacity:.9;text-shadow:0 1px 4px rgba(0,0,0,.6)"><span id="views">4,851</span> vistas</div>

</div>
<script>
${sceneJS(s)}
</script>
</body>
</html>`;
}

mkdirSync('videos', { recursive: true });
for (const s of SCENES) {
  writeFileSync(join('videos', s.id + '.html'), renderScene(s), 'utf8');
}
console.log('Generated ' + SCENES.length + ' scenes in videos/');