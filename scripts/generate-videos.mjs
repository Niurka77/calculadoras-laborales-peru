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
    hook: 'Te prometieron S/ 2,500 en planilla.\nEsto es lo que REALMENTE llega a tu banco:',
    cta: 'Revisa tu caso gratis',
    hashtags: ['#SueldoNeto', '#PlanillaPeru', '#AFP', '#QuintaCategoria'],
  },
  {
    id: '02-gratificacion-1800',
    tipo: 'gratif',
    tab: 'Gratificaci\u00f3n',
    sueldo: '1,800',
    bonif: '972.00',
    total: '11,772.00',
    hook: '\u00bfCu\u00e1nto te toca de gratificaci\u00f3n?\nNo hagas matem\u00e1ticas, mira tu resultado:',
    cta: 'Guarda este video para julio y diciembre',
    hashtags: ['#Gratificacion', '#FiestasPatrias', '#SueldoPeru', '#NavidadPeru'],
  },
  {
    id: '03-quinta-categoria-4000',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '4,000',
    descuento: '504.80',
    neto: '3,495.20',
    hook: 'Ganas S/ 4,000 al mes.\nY aqu\u00ed viene la 5ta categor\u00eda a retenerte.',
    cta: 'Mira tu desglose completo',
    hashtags: ['#QuintaCategoria', '#SUNAT', '#ImpuestoRenta', '#SueldoBruto'],
  },
  {
    id: '04-onp-vs-afp-2000',
    tipo: 'comparar',
    tab: 'Sueldo Neto',
    sueldo: '2,000',
    label1: 'ONP (13%)',
    valor1: '1,740.00',
    label2: 'AFP Integra',
    valor2: '1,747.60',
    hook: 'ONP vs AFP con S/ 2,000.\n\u00bfCu\u00e1l te deja M\u00c1S plata en el bolsillo?',
    cta: 'Prueba ambos gratis',
    hashtags: ['#ONP', '#AFP', '#PensionesPeru', '#AhorroPeru'],
  },
  {
    id: '05-cts-2200',
    tipo: 'cts',
    tab: 'CTS',
    sueldo: '2,200',
    cts: '2,200.00',
    interes: '82.50',
    hook: 'Tu CTS est\u00e1 durmiendo en el banco.\nPodr\u00eda ganarte S/ 82.50 en solo 6 meses.',
    cta: 'Mueve tu CTS a un banco que pague m\u00e1s',
    hashtags: ['#CTS', '#CompensacionTiempoServicio', '#BancoPeru', '#Ahorro'],
  },
  {
    id: '06-rmv-1025',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '1,025',
    descuento: '129.36',
    neto: '895.64',
    hook: 'Sueldo m\u00ednimo 2026: S/ 1,025.\nAunque sea el m\u00ednimo, tambi\u00e9n descuentan.',
    cta: 'Calcula el tuyo',
    hashtags: ['#SueldoMinimo', '#RMV', '#Peru2026', '#TrabajadoresPeru'],
  },
  {
    id: '07-horas-extras-2500',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '2,500',
    descuento: '315.50',
    neto: '2,184.50',
    hook: 'S/ 2,000 + S/ 500 de horas extras.\nLas HE pagan ONP/AFP, no gratificaci\u00f3n.',
    cta: 'Simula tus horas extra',
    hashtags: ['#HorasExtras', '#SueldoBruto', '#PlanillaPeru', '#EmpleoPeru'],
  },
  {
    id: '08-contador-3500',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '3,500',
    descuento: '441.70',
    neto: '3,058.30',
    hook: 'Eres contador y ganas S/ 3,500.\n\u00bfSabes exactamente cu\u00e1nto te retienen?',
    cta: 'Comparte con tu equipo',
    hashtags: ['#Contador', '#ContabilidadPeru', '#ProfesionalesPeru', '#QuintaCategoria'],
  },
  {
    id: '09-sueldo-gross-5000',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '5,000',
    descuento: '669.67',
    neto: '4,330.33',
    hook: '\u201cGanas S/ 5,000\u201d dijiste.\nEntre AFP + 5ta categor\u00eda te quedas con...',
    cta: 'Nunca negocies sin calcular',
    hashtags: ['#SueldoGross', '#NegociacionSalarial', '#ImpuestoRenta', '#Peru'],
  },
  {
    id: '10-calculadora-rapida-2800',
    tipo: 'neto',
    tab: 'Sueldo Neto',
    sueldo: '2,800',
    descuento: '353.36',
    neto: '2,446.64',
    hook: 'En 1 segundo sabes tu sueldo neto.\nSin registros. Sin formularios. Gratis.',
    cta: 'Guarda este video',
    hashtags: ['#CalculadoraPeru', '#SueldoNeto', '#HerramientaGratis', '#Viral'],
  },
];

const CSS_ANIMS = `
#app.run .top { opacity: 1; animation: animDown .5s ease .5s both; }
#app.run .card { opacity: 1; animation: animPop .45s ease 1.6s both; }
#app.run .sueldo::after { display: inline-block; animation: blink .7s steps(1) 0s 3; }
#app.run .loader { opacity: 1; animation: animFade .3s ease 2.6s both; }
#app.run .row { opacity: 1; animation: animFade .3s ease 3.4s both; }
#app.run .result { opacity: 1; animation: animPop .5s cubic-bezier(.175,.885,.32,1.275) 4s both; }
#app.run .compare { opacity: 1; animation: animPop .5s cubic-bezier(.175,.885,.32,1.275) 4s both; }
#app.run .hook { opacity: 1; animation: animUp .6s ease 6.2s both; }
#app.run .cta { opacity: 1; animation: animUp .5s ease 8s both; }
#app.run .tags { opacity: 1; animation: animUp .5s ease 8.6s both; }
@keyframes animDown { from { opacity: 0; transform: translateY(-14px); } }
@keyframes animPop { from { opacity: 0; transform: scale(.9); } }
@keyframes animUp { from { opacity: 0; transform: translateY(12px); } }
@keyframes animFade { from { opacity: 0; } }
@keyframes blink { 50% { opacity: 0; } }
`;

function sceneJS(s) {
  const dv = s.tipo === 'neto' ? s.neto : s.tipo === 'gratif' ? s.total : s.tipo === 'cts' ? s.cts : s.valor1;
  const target = parseFloat(dv.replace(',', ''));
  let compararJS = '';
  if (s.tipo === 'comparar') {
    compararJS = `countUp('v2', 1747.60, 4700);`;
  }
  return `
const app = document.getElementById('app');
let raf = null;
function countUp(id, val, delay) {
  const el = document.getElementById(id);
  const dur = 1500;
  let t0 = null;
  function step(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = 'S/ ' + (val * e).toFixed(2);
    if (p < 1) requestAnimationFrame(step);
  }
  setTimeout(() => requestAnimationFrame(step), delay);
}
function play() {
  app.classList.add('run');
  countUp('valor', ${target}, 4200);
  ${compararJS}
}
function restart() {
  app.classList.remove('run');
  void app.offsetWidth;
  cancelAnimationFrame(raf);
  setTimeout(() => { document.getElementById('valor').textContent = 'S/ 0.00'; if (document.getElementById('v2')) document.getElementById('v2').textContent = '0.00'; }, 100);
  setTimeout(play, 200);
}
window.addEventListener('load', play);
setInterval(restart, 11700);
`;
}

function renderScene(s) {
  const isComparar = s.tipo === 'comparar';
  const isGratif = s.tipo === 'gratif';
  const isCts = s.tipo === 'cts';
  const hookLines = s.hook.split('\n').map((l) => `<span>${l}</span>`).join('');
  const tags = s.hashtags.map((h) => `<span class="tag">${h}</span>`).join('');
  const center = isComparar
    ? `
    <div class="compare" id="compare">
      <div class="cbox"><div class="l">${s.label1}</div><div class="v">${s.valor1}</div></div>
      <div class="cbox hl"><div class="l">${s.label2}</div><div class="v" id="v2">0.00</div></div>
    </div>`
    : isGratif || isCts
      ? `
    <div class="row"><span>${isCts ? 'Pr\u00f3ximos 6 meses' : 'Bonificaci\u00f3n EsSalud 9%'}</span><span>${isCts ? 'S/ 1,100.00' : '+ S/ ' + s.bonif}</span></div>
    <div class="result" id="result">
      <div class="label">${isCts ? 'CTS a Depositar' : 'Gratificaci\u00f3n Total'}</div>
      <div class="big" id="valor">S/ 0.00</div>
      ${isCts ? `<span class="badge">+${s.interes} inter\u00e9s</span>` : ''}
    </div>`
      : `
    <div class="row"><span>Descuento pensi\u00f3n</span><span>- S/ ${s.descuento}</span></div>
    <div class="result" id="result">
      <div class="label">Sueldo Neto</div>
      <div class="big" id="valor">S/ 0.00</div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${s.hook.split('\n')[0].slice(0, 40)}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; }
body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0a0f1e;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.phone {
  width: 400px; height: 800px;
  max-width: 100vw; max-height: 100vh;
  aspect-ratio: 1/2;
  background: #0F172A;
  border-radius: 40px;
  padding: 26px;
  display: flex; flex-direction: column;
  border: 2px solid #1E3A8A;
  box-shadow: 0 0 60px rgba(30,58,138,.25);
  position: relative;
}
.top { display: flex; justify-content: space-between; align-items: center; opacity: 0; }
.logo { display: flex; align-items: center; gap: 6px; color: #fff; font-weight: 700; font-size: 14px; }
.logo .dot { width: 9px; height: 9px; border-radius: 50%; background: #059669; }
.tab { background: #059669; color: #fff; font-size: 11px; font-weight: 700; padding: 6px 14px; border-radius: 20px; }
.card { background: #1E293B; border-radius: 22px; padding: 20px; margin-top: 18px; opacity: 0; }
.field label { color: #94A3B8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; }
.sueldo { color: #fff; font-size: 54px; font-weight: 900; margin-top: 6px; font-variant-numeric: tabular-nums; }
.sueldo::after { content: ''; width: 3px; height: 42px; background: #059669; margin-left: 5px; vertical-align: -7px; }
.loader { color: #94A3B8; font-size: 12px; margin-top: 10px; opacity: 0; }
.loader .spin { display: inline-block; animation: rotate 1s linear infinite; }
@keyframes rotate { to { transform: rotate(360deg); } }
.row { display: flex; justify-content: space-between; color: #CBD5E1; font-size: 13px; margin-top: 12px; opacity: 0; }
.row span + span { font-weight: 700; }
.result {
  background: linear-gradient(135deg, #059669, #047857);
  border-radius: 22px; padding: 20px; margin-top: 14px;
  opacity: 0; transform: scale(.9);
}
.result .label { color: rgba(255,255,255,.85); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; }
.result .big { color: #fff; font-size: 46px; font-weight: 900; margin-top: 4px; font-variant-numeric: tabular-nums; }
.compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; opacity: 0; transform: scale(.92); }
.cbox { background: #1E293B; border-radius: 18px; padding: 16px; text-align: center; }
.cbox .l { color: #94A3B8; font-size: 11px; font-weight: 700; }
.cbox .v { color: #fff; font-size: 30px; font-weight: 900; margin-top: 6px; font-variant-numeric: tabular-nums; }
.cbox.hl { background: linear-gradient(135deg, #059669, #047857); }
.cbox.hl .l, .cbox.hl .v { color: #fff; }
.hook { margin-top: 20px; color: #fff; font-size: 23px; font-weight: 900; line-height: 1.4; opacity: 0; transform: translateY(12px); }
.hook span { display: block; }
.hook span:nth-child(2) { color: #FCD34D; }
.cta { margin-top: auto; color: #059669; font-size: 14px; font-weight: 700; text-align: center; opacity: 0; transform: translateY(12px); }
.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; justify-content: center; opacity: 0; transform: translateY(12px); }
.tag { background: #1E3A8A; color: #93C5FD; font-size: 10px; padding: 5px 11px; border-radius: 20px; font-weight: 600; }
.badge { position: absolute; top: -8px; right: -10px; background: #F59E0B; color: #0F172A; font-size: 10px; font-weight: 900; padding: 4px 9px; border-radius: 20px; transform: rotate(5deg); }
.desc { color: #64748B; font-size: 10px; text-align: center; margin-top: 12px; }
${CSS_ANIMS}
</style>
</head>
<body>
<div class="phone" id="app">
  <div class="top">
    <div class="logo"><span class="dot"></span> Calculadoras Laborales</div>
    <span class="tab">${s.tab}</span>
  </div>
  <div class="card">
    <div class="field"><label>Sueldo Bruto Mensual</label></div>
    <div class="sueldo">S/ ${s.sueldo}</div>
    <div class="loader"><span class="spin">\u27f3</span>&nbsp; Calculando AFP + 5ta categor\u00eda...</div>
    ${center}
  </div>
  <div class="hook">${hookLines}</div>
  <div class="tags" id="tags">${tags}</div>
  <div class="cta">${s.cta} \u2192 calculadoras-laborales-peru.vercel.app</div>
  <div class="desc">Material de apoyo - graba con OBS o grabadora del celular</div>
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